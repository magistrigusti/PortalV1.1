import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { INavLink } from "@/types";
import { sidebarLinks } from "@/constants";
import { Loader } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useUserContext, INITIAL_USER } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();
  const { mutate: signOut } = useSignOutAccount();

  // const handleSignOut = async (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   e.preventDefault();
  //   signOut();
  //   setAuthenticated(false);
  //   setUser(INITIAL_USER);
  //   navigate("sign-in");
  // };

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img 
            src="/assets/images/logo.png"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>

        <Link className="flex gap-3 items-center"
         to={`/profile/${user.id}`}
        >
          <img className="h-14 w-14 rounded-full"
            src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="logo profile"
          />

          <div className="flex flex-col">
            <p className="body-bold">
              { user.name }
            </p>

            <p className="small-regular text-light-3">
              @${user.username}
            </p>
          </div>
        </Link>

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;

            return(
              <li className={`leftsidebar-link ${ isActive && 'bg-primary-500'}`}
                key={link.label}
              >
                <NavLink className="flex gap-4 items-center p-4"
                  to={link.route}
                >
                  <img className={`group-hover:invert-white ${ isActive && 'invert-white'}`}
                    src={link.imgURL}
                    alt={link.label}
                  />

                  { link.label }
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export default LeftSidebar;