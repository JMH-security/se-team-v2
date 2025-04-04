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
    
    const navRole = role?.role || "unauthorized"

    


    

  return (
    <>
    <div className="border-[1vh] border-secondary bg-secondary"></div>
            <div className="flex flex-wrap bg-muted m-0 p-0 justify-start items-center">
                <div className="flex flex-wrap bg-muted m-1 p-2 grow">
                    <NavigationMenu>
                        <NavigationMenuList className="flex flex-wrap mr-1 ml-1">
                            <NavigationMenuItem>
                            <NavigationMenuTrigger className="bg-gp">WinTeam Items</NavigationMenuTrigger>
                            <NavigationMenuContent className="">
                                <Link className="mt-2" href="/seteam/customers" legacyBehavior passHref>
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
                            <NavigationMenuTrigger className="bg-gp">Integrated</NavigationMenuTrigger>
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

                    {navRole === "admin" && (
                        <NavigationMenu>
                            <NavigationMenuList className="mr-1 ml-1">
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="bg-gp">Admin Tools</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <Link href="/seteam/admin/user" legacyBehavior passHref>
                                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                Users
                                            </NavigationMenuLink>
                                        </Link>
                                        <Link href="/seteam/admin/wt" legacyBehavior passHref>
                                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                WinTeam Admin
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    )}













                   
                </div>    
                <div className="bg-muted m-1 p-2">
                    <ModeToggle />
                </div>
            </div>
            </>
  )
}

export default NavMenu