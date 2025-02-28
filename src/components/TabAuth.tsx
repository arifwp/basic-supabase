import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import LoginForm from "./forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";

const tabList = [
  {
    label: "Register",
    element: <RegisterForm />,
  },
  {
    label: "Login",
    element: <LoginForm />,
  },
];

export default function TabAuth() {
  return (
    <TabGroup>
      <TabList className={"w-full flex justify-center"}>
        {tabList.map((item, i) => (
          <Tab
            key={i}
            className={
              "rounded-md py-1 px-3 mb-12 text-lg font-semibold data-[selected]:bg-green-secondary data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-green-primary data-[focus]:outline-1 data-[focus]:outline-white"
            }
          >
            {item.label}
          </Tab>
        ))}
      </TabList>

      <TabPanels>
        {tabList.map((item, i) => (
          <TabPanel key={i}>{item.element}</TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
}
