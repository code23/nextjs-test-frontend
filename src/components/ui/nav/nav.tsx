'use client'

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react'
import { navItems } from './data'

export function Nav() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button radius="full" color="secondary">
          Menu
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" items={navItems}>
        {(item) => (
          <DropdownItem key={item.key} href={item.href} className="text-black">
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  )
}
