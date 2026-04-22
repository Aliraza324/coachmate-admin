import React, { useState } from 'react'
import SystemSetting from '@/components/setting/SystemSetting'
import PrivacySetting from '@/components/setting/PrivacySetting'

export function SettingsPage() {
  return (
    <>
    <SystemSetting/>
    <PrivacySetting/>
    </>
  )
}
