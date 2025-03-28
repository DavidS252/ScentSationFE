import { faHome, faUser, faWineBottle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Tooltip,
} from "@nextui-org/react";
import {
  Outlet,
  createLazyFileRoute,
  useNavigate,
} from "@tanstack/react-router";
import { Key, useEffect, useState } from "react";
import EditProfileModal from "../components/EditProfileModal.tsx";
import SearchBar from "../components/SearchBar.tsx";
import useCurrentUser from "../hooks/useCurrentUser";
import { logout } from "../services/user-service";
import ChatModal from "../components/ChatModal.tsx"

export const Route = createLazyFileRoute("/home")({
  component: Home,
});

function Home() {
  const navigate = useNavigate();

  const [openEdit, setOpenEdit] = useState(false);

  const handleUserDropdownItem = async (key: Key) => {
    if (key === "edit") {
      setOpenEdit(true);
    }

    if (key === "logout") {
      const res = await logout();
      if (res === "Logout succeeded") {
        localStorage.removeItem("currentTab");
        localStorage.removeItem("currentUser");
        navigate({ to: "/" });
      }
    }
  };

  // const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const currentTab = localStorage.getItem("currentTab");
    if (!currentTab) localStorage.setItem("currentTab", "1");
  }, []);

  const currentTab = localStorage.getItem("currentTab") ?? "1";
  const currentUser = useCurrentUser();

  return (
    <>
      <Navbar
        isBordered
        classNames={{
          item: [
            "flex",
            "relative",
            "h-full",
            "items-center",
            "data-[active=true]:after:content-['']",
            "data-[active=true]:after:absolute",
            "data-[active=true]:after:bottom-0",
            "data-[active=true]:after:left-0",
            "data-[active=true]:after:right-0",
            "data-[active=true]:after:h-[2px]",
            "data-[active=true]:after:rounded-[2px]",
            "data-[active=true]:after:bg-primary",
          ],
        }}
      >
        <ChatModal />
        <NavbarBrand>
          <p className="font-bold text-inherit">ScentSation</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive={currentTab === "1"}>
            <Link
              href="./me"
              onClick={() => localStorage.setItem("currentTab", "1")}
              color={currentTab === "1" ? "primary" : "foreground"}
            >
              <Tooltip
                content="Home Page"
                key="bottom"
                placement="bottom"
                color="foreground"
              >
                <FontAwesomeIcon icon={faHome} className="w-[48px] h-[20px]" />
              </Tooltip>
            </Link>
          </NavbarItem>
          <NavbarItem isActive={currentTab === "2"}>
            <Link
              href="./fragrances"
              onClick={() => localStorage.setItem("currentTab", "2")}
              color={currentTab === "2" ? "primary" : "foreground"}
            >
              <Tooltip
                content="Fragrances for you"
                key="bottom"
                placement="bottom"
                color="foreground"
              >
                <FontAwesomeIcon icon={faWineBottle} className="w-[48px] h-[20px]" />
              </Tooltip>
            </Link>
          </NavbarItem>
          <NavbarItem isActive={currentTab === "3"}>
            <Link
              href={`./${currentUser?._id}`}
              onClick={() => localStorage.setItem("currentTab", "3")}
              color={currentTab === "3" ? "primary" : "foreground"}
            >
              <Tooltip
                content="My Reviews"
                key="bottom"
                placement="bottom"
                color="foreground"
              >
                <FontAwesomeIcon icon={faUser} className="w-[48px] h-[20px]" />
              </Tooltip>
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <SearchBar />
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={currentUser.email}
                showFallback
                size="sm"
                src={currentUser.imgUrl}
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Profile Actions"
              variant="flat"
              onAction={handleUserDropdownItem}
            >
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{currentUser.username}</p>
              </DropdownItem>
              <DropdownItem
                key="edit"
                className="h-14 gap-2"
                isDisabled={currentUser.isGoogleSignIn}
              >
                Edit profile
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
      {openEdit && (
        <EditProfileModal
          isOpen={openEdit}
          handleClose={() => setOpenEdit(false)}
        />
      )}
      <Outlet />
    </>
  );
}
