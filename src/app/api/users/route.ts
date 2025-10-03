import { NextRequest, NextResponse } from 'next/server'

import { createClient } from '@/utils/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const {
      email,
      firstName,
      lastName,
      phoneNumber,
      gender,
      ethnicity,
      universityId,
      upi,
      areaOfStudy,
      yearLevel,
    } = await req.json()
    const supabase = await createClient()

    const { data, error } = await supabase.from('users').insert([
      {
        email,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        gender,
        ethnicity,
        university_id: universityId,
        upi,
        area_of_study: areaOfStudy,
        year_level: yearLevel,
      },
    ])

    if (error) throw error

    return NextResponse.json({ success: true, user: data[0] })
  } catch (err) {
    console.error('Error creating user:', err)
    return NextResponse.json({ success: false, error: 'Failed to create user' }, { status: 500 })
  }
}
