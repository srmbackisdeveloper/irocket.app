import {
   Dropdown,
   DropdownItem,
   DropdownMenu,
   DropdownSection,
   DropdownTrigger,
} from '@nextui-org/react'
import { ProfileAvatar } from '../shared/ProfileAvatar'
import { Profile } from '../shared/icons/Profile.icon'
import { ArrowOut } from '../shared/icons/ArrowOut.icon'
import { Link } from 'react-router-dom'

interface ProfileDropdownProps {
   username?: string
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
   username = 'Новый пользователь',
}) => {
   return (
      <Dropdown>
         <DropdownTrigger>
            <button>
               <ProfileAvatar />
            </button>
         </DropdownTrigger>
         <DropdownMenu aria-label="User Profile" disabledKeys={['profile']}>
            <DropdownSection>
               <DropdownItem key="profile" isReadOnly className="opacity-100">
                  <div className="flex w-1/4 items-center">
                     <ProfileAvatar />
                     <p className="pl-4 text-xl text-wrap">{username}</p>
                  </div>
               </DropdownItem>
            </DropdownSection>
            <DropdownSection>
               <DropdownItem key="my-profile">
                  <Link to={'/dashboard/profile'}>
                     <div className="flex items-center gap-2">
                        <Profile />
                        <p>Мой профиль</p>
                     </div>
                  </Link>
               </DropdownItem>
            </DropdownSection>
            <DropdownSection>
               <DropdownItem key="exit">
                  <Link to={'/'}>
                     <div className="flex items-center gap-2">
                        <ArrowOut />
                        <p>Выйти</p>
                     </div>
                  </Link>
               </DropdownItem>
            </DropdownSection>
         </DropdownMenu>
      </Dropdown>
   )
}
