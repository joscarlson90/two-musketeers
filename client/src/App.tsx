import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "./components/ui/navigation-menu";

export function App() {
  return (
    <header className="flex items-center justify-between px-8 py-8 text-[#E6DECF] bg-[#CB3038]">
      <h1 className="text-3xl font-bold">LOGGA</h1>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Dagens Bild</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="p-4">
                Varje dag presenterar vi en ny bild från vårt galleri. Kolla in dagens bild och låt dig inspireras!
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden md:flex">
            <NavigationMenuTrigger>Slumpa</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="p-4">
                Klicka på knappen nedan för att slumpa fram en bild från vårt galleri.
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Admin</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="p-4">
                För dig som är administratör, logga in för att hantera bilder och användare.
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Bli Medlem</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="p-4">
                Skapa konto för att börja lägga upp bilder.
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu >
    </header>
  );
}
export default App;
