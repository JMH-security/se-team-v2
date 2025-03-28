import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
  } from "@/components/ui/navigation-menu"
  import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
  import Link from "next/link"
  import { ModeToggle } from "@/components/header/ModeToggle"


function NavMenu(role) {

  const sessionRole = role.role


  return (
    <>
    <div className="border-[1vh] border-secondary bg-secondary"><p>HELLO {sessionRole}</p></div>
            <div className="flex flex-wrap m-0 p-0 justify-start items-center">
                <div className="flex flex-wrap m-1 grow">
                    <NavigationMenu>
                        <NavigationMenuList className="flex flex-wrap mr-1 ml-1">
                            <NavigationMenuItem>
                            <NavigationMenuTrigger>WinTeam Items</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <Link href="/seteam/customers" legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Customers</NavigationMenuLink>
                                </Link>
                                <Link href="/seteam/jobs" legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Jobs</NavigationMenuLink>
                                </Link>
                                <Link href="/seteam/employees" legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Employees</NavigationMenuLink>
                                </Link>    
                            </NavigationMenuContent>        
                            </NavigationMenuItem>
                        </NavigationMenuList>
                        </NavigationMenu>
                        <NavigationMenu>
                        <NavigationMenuList className="mr-1 ml-1">
                            <NavigationMenuItem>
                            <NavigationMenuTrigger>Integrated</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <Link href="/seteam/" legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>MSUs</NavigationMenuLink>
                                </Link>
                                <Link href="/seteam/" legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>TBD1</NavigationMenuLink>
                                </Link>
                                <Link href="/seteam/" legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>TBD2</NavigationMenuLink>
                                </Link>    
                            </NavigationMenuContent>  
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>    
                <div className="">
                    <ModeToggle />
                </div>
            </div>
            </>
  )
}

export default NavMenu