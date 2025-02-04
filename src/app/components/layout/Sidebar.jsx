'use client'

import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { MessageSquare, Menu, X, User, Settings, LogOut, Plus } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../common'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()
  const [dropdownOpen, setDropDownOpen] = useState(false)

  const ChatHistory = () => (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4">
        <Button 
          onClick={() => {}} 
          className="w-full mb-4 flex items-center justify-center gap-2 bg-black-200 hover:bg-black-300 dark:bg-white text-white dark:text-black-200"
        >
          <Plus className="h-4 w-4" />
          New Chat
        </Button>

        <h3 className="text-sm font-medium text-black-300 dark:text-white-700 mb-2">Recent Chats</h3>
        <div className="space-y-2">
          {/* Example chat items - replace with real data */}
          {[1, 2, 3].map((chat) => (
            <div 
              key={chat}
              className="p-2 rounded-lg hover:bg-black-100/10 dark:hover:bg-white-500/10 cursor-pointer"
            >
              <p className="text-sm text-black-300 dark:text-white-700 truncate">
                Chat Session {chat}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const UserMenuMobile = () => (
    <div className="lg:hidden border-t border-black-300/10 dark:border-white-500/10 p-4">
      <div className="flex items-center space-x-3 mb-4">
        {session?.user?.image ? (
          <img 
            src={session.user.image}
            alt={session.user.name}
            className="rounded-full h-10 w-10"
          />
        ) : (
          <User className="h-10 w-10" />
        )}
        <div>
          <p className="font-medium text-black-300 dark:text-white-700">
            {session?.user?.name || session?.user?.email}
          </p>
        </div>
      </div>
      
      <div className="space-y-2">
        <Link href="/account/settings">
          <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-black-100/10 dark:hover:bg-white-500/10">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </div>
        </Link>
        
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="w-full flex items-center space-x-2 p-2 rounded-lg hover:bg-black-100/10 dark:hover:bg-white-500/10"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  )

  if (!session) return null

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 h-10 w-10 flex items-center justify-center rounded-full bg-black-200 text-white dark:bg-white dark:text-black-200"
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 
        bg-light-primary dark:bg-dark-primary 
        border-r border-black-300/10 dark:border-white-500/10
        transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static
        z-40
      `}>
        <div className="h-full flex flex-col">
          <ChatHistory />
          <UserMenuMobile />
        </div>
      </div>
    </>
  )
}

export default Sidebar
