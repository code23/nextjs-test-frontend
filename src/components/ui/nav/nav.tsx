'use client'

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Button,
} from '@heroui/react'
import { navItems } from './data'

const nonAuthItems = navItems.filter((item) => !item.auth)
const authItems = navItems.filter((item) => item.auth)

export function Nav() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button radius="full" color="secondary">
          Menu
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions">
        <DropdownSection showDivider title="Without auth" items={nonAuthItems}>
          {(item) => (
            <DropdownItem
              key={item.key}
              href={item.href}
              className="text-black"
            >
              {item.label}
            </DropdownItem>
          )}
        </DropdownSection>
        <DropdownSection title="With auth" items={authItems}>
          {(item) => (
            <DropdownItem
              key={item.key}
              href={item.href}
              className="text-black"
            >
              {item.label}
            </DropdownItem>
          )}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}
