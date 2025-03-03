import { Select } from "@headlessui/react";
import { useEffect, useState } from "react";
import { supabase } from "../../libs/supabase";
import { RoleInterface } from "../../constants/RoleInterface";

interface Props {
  inputValue?: string;
  onSelected: (id: string) => void;
}

export default function RoleInput({ inputValue, onSelected }: Props) {
  const [data, setData] = useState<RoleInterface[] | undefined>(undefined);

  useEffect(() => {
    const fetchRole = async () => {
      const { data: rolesData, error } = await supabase
        .from("roles")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        return;
      }

      console.log("datarole", data);
      setData(rolesData);
    };

    fetchRole();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelected(e.target.value);
  };

  if (!data) {
    return;
  }

  return (
    <Select
      className={"input-primary !px-2 !py-0"}
      value={inputValue}
      aria-label="select-input"
      onChange={(e) => handleChange(e)}
    >
      {data.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </Select>
  );
}
