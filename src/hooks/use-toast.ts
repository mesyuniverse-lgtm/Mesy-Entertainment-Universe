// Inspired by react-hot-toast library
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    clearTimeout(toastTimeouts.get(toastId))
  }

  toastTimeouts.set(
    toastId,
    setTimeout(() => {
      dispatch({
        type: actionTypes.REMOVE_TOAST,
        toastId: toastId,
      })
    }, TOAST_REMOVE_DELAY)
  )
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a middleware.
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case actionTypes.REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const DEFAULT_STATE: State = {
  toasts: [],
}

const ToastContext = React.createContext<{
  ...State
  toast: ({ ...props }: ToastProps) => void
  dismiss: (toastId?: string) => void
  update: (toast: Partial<ToasterToast>) => void
}>(
  {
    ...DEFAULT_STATE,
    toast: () => {},
    dismiss: () => {},
    update: () => {},
  }
)

type ToastProviderProps = {
  children: React.ReactNode
}

const ToastProvider = ({ children }: ToastProviderProps) => {
  const [state, dispatch] = React.useReducer(reducer, DEFAULT_STATE)

  const toast = React.useCallback(
    ({ ...props }: ToastProps) => {
      const id = genId()

      dispatch({
        type: actionTypes.ADD_TOAST,
        toast: {
          ...props,
          id,
          open: true,
          onOpenChange: (open) => {
            if (!open) dismiss(id)
          },
        },
      })
    },
    [dispatch]
  )

  const dismiss = React.useCallback(
    (toastId?: string) => dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),
    [dispatch]
  )

  const update = React.useCallback(
    (toast: Partial<ToasterToast>) => dispatch({ type: actionTypes.UPDATE_TOAST, toast }),
    [dispatch]
  )

  React.useEffect(() => {
    return () => {
      state.toasts.forEach((toast) => {
        clearTimeout(toastTimeouts.get(toast.id))
      })
    }
  }, [state.toasts])

  return (
    <ToastContext.Provider value={{ ...state, toast, dismiss, update }}>
      {children}
    </ToastContext.Provider>
  )
}

function useToast() {
  const context = React.useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

export { ToastProvider, useToast, toastTimeouts }
