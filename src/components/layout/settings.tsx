import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { User } from 'lucide-react'
import { signOut } from 'auth-astro/client'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { toast } from 'sonner'

export default function Settings({ username }: { username: string }) {

  const logout = async () => {
    const id = toast.loading('Cerrando sesión')
    await signOut()
    toast.success('Sesión cerrada', { id })
    window.location.href = '/'
  }

  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
              <Avatar>
                <AvatarFallback>
                  {username[0]}
                </AvatarFallback>
              </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>{username}</DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuItem onClick={() => window.location.href=`/${username}/complaints`}>
              Mis quejas
            </DropdownMenuItem>
            <DropdownMenuItem>
              Perfil
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem onClick={logout}>
              Cerrar sesión
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
