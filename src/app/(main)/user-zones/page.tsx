import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import {db} from '@core/firebase-functions'
import {Card, CardBody, CardHeader} from '@nextui-org/react'
import {User} from 'next/auth'
import {getServerSession} from 'next-auth'
import {authOptions} from '@core/auth-options'
import {redirect} from 'next/navigation'
import {RoleChip} from '@components/core'
import React from 'react'

async function getUserZone(uid: string) {
  const zonesRef = collection(db, 'zones')
  const q = query(zonesRef, where('members', 'array-contains', uid))
  const querySnapshot = await getDocs(q)
  const zones: any = []
  querySnapshot.forEach(doc => {
    zones.push({id: doc.id, ...doc.data()})
  })
  return zones
}

async function getUserProfile(uid: string) {
  const userDoc = doc(db, 'users', uid)
  const docSnapshot = await getDoc(userDoc)
  if (docSnapshot.exists()) {
    return docSnapshot.data()
  }
  return null
}

export default async function UserZones() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    redirect('/')
  }
  const user = session.user as User
  const profile = await getUserProfile(user.id!)
  const zones = await getUserZone(user.id!)

  return (
    <section className="p-4">
      <h1 className="text-2xl mb-4">พื้นที่ของคุณ</h1>
      <Card className="mb-4">
        <CardHeader className="pb-0 flex-col items-start">
          <p className="text-tiny uppercase font-bold">ข้อมูลผู้ใช้</p>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <p>ชื่อ: {user.name}</p>
          <p>อีเมล: {user.email}</p>
          {profile && (
            <>
              <p>
                บทบาท:{' '}
                {Array.isArray(profile.roles) ? (
                  profile.roles.map((role: string, index: number) => (
                    <RoleChip key={index} role={role} />
                  ))
                ) : (
                  <RoleChip role={profile.roles} />
                )}
              </p>
              {/* Add other user profile details as needed */}
            </>
          )}
        </CardBody>
      </Card>
      <Card>
        <CardHeader className="pb-0 flex-col items-start">
          <p className="text-tiny uppercase font-bold">พื้นที่ที่สังกัด</p>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          {zones.length > 0 ? (
            <ul>
              {zones.map((zone: any) => (
                <li key={zone.id}>
                  {zone.name} (บทบาทในพื้นที่: {zone.members[user.id]?.role})
                  {/* You might want to display other zone details here */}
                </li>
              ))}
            </ul>
          ) : (
            <p>ยังไม่มีพื้นที่ที่สังกัด</p>
          )}
        </CardBody>
      </Card>
    </section>
  )
}
