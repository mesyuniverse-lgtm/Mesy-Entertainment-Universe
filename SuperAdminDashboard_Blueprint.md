# Blueprint: Super Admin Dashboard

เอกสารนี้คือพิมพ์เขียว (Blueprint) เฉพาะสำหรับ **แดชบอร์ดหลักของผู้ดูแลระบบสูงสุด (Super Admin Dashboard)** ซึ่งเป็นหน้าแรกและเป็นศูนย์กลางข้อมูลภาพรวมทั้งหมดเมื่อ Super Admin เข้าสู่ระบบ ณ `/sup-dashboard`

## 1. แนวคิดหลัก (Core Concept)

- **Mission Control:** เป็นศูนย์บัญชาการที่แสดง "ชีพจร" ของทั้งแพลตฟอร์ม MESY Universe ในหน้าจอเดียว ช่วยให้ Super Admin สามารถประเมินสถานการณ์และเข้าถึงส่วนที่สำคัญได้อย่างรวดเร็ว
- **Data at a Glance:** นำเสนอข้อมูลที่สำคัญที่สุดในรูปแบบที่เข้าใจง่าย ผ่านการ์ดสรุป, กราฟ, และรายการที่ต้องดำเนินการ
- **Action-Oriented:** ไม่ใช่แค่แสดงข้อมูล แต่ต้องมีทางลัด (Shortcuts) เพื่อให้ Super Admin สามารถเข้าไปจัดการส่วนต่างๆ ได้ทันที

## 2. ส่วนประกอบหลักบนแดชบอร์ด (Key Dashboard Components)

- **Key Metrics (ตัวชี้วัดหลัก):**
  - **รูปแบบ:** การ์ดสรุปตัวเลข (Stat Cards) ที่แสดงข้อมูลสำคัญแบบเรียลไทม์
  - **ตัวอย่าง:**
    - จำนวนผู้ใช้ทั้งหมด (Total Users)
    - จำนวนสมาชิกใหม่วันนี้/สัปดาห์นี้ (New Members Today/Week)
    - รายได้รวมวันนี้/เดือนนี้ (Total Revenue Today/Month)
    - จำนวนผู้ใช้งานออนไลน์ (Concurrent Users)

- **Real-time Activity Feed (ฟีดกิจกรรมล่าสุด):**
  - **รูปแบบ:** รายการ (List) ที่อัปเดตกิจกรรมล่าสุดที่เกิดขึ้นบนแพลตฟอร์ม
  - **ตัวอย่าง:**
    - "User 'Zane' just reached Level 10"
    - "New transaction of 5,000 MC created"
    - "AI Moderation flagged a post in Group 'Dragon Knights'"

- **System Health Status (สถานะสุขภาพของระบบ):**
  - **รูปแบบ:** การ์ดแสดงสถานะของบริการหลักต่างๆ ด้วยสี (เขียว, เหลือง, แดง)
  - **ตัวอย่าง:**
    - Authentication Service: **Operational**
    - Firestore Database: **Operational**
    - AI Generation API: **Experiencing Delays**

- **Pending Approvals Queue (รายการรอการอนุมัติ):**
  - **รูปแบบ:** รายการที่แสดงหัวข้อที่ต้องการการตรวจสอบและอนุมัติจาก Super Admin
  - **ตัวอย่าง:**
    - "Withdrawal request from 'Aria' for 10,000 MC"
    - "New partner shop application: 'The Rusty Sword'"

- **Quick Access (ทางลัด):**
  - **รูปแบบ:** ชุดของปุ่มหรือลิงก์ที่นำไปยังส่วนการจัดการที่สำคัญ
  - **ตัวอย่าง:**
    - User Monitoring (`/monitor`)
    - Accounting (`/accounting`)
    - AI System (`/ai-system`)
    - UI/UX Studio (`/sup-studo`)
    - Send Global Notification

## 3. Layout

- **แถวบนสุด:** แสดง Key Metrics เพื่อให้เห็นภาพรวมทันที
- **คอลัมน์ซ้าย:** แสดง Real-time Activity Feed และ Pending Approvals Queue
- **คอลัมน์ขวา:** แสดง System Health Status และ Quick Access Links