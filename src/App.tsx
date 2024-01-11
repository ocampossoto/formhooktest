import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField } from "@mui/material";
const total = 1000;
function getNames() {
  let data = [];
  for (let i = 0; i < total; i++) {
    data.push(`Name-${i}`);
  }
  return data;
}
function getObject(namesData: any) {
  let schemaObject: any = {};
  for (let name of namesData) {
    schemaObject[name] = yup.string();
  }
  return schemaObject;
}

function App() {
  const namesList = getNames();
  const schemaTemp = getObject(namesList);
  const schema1 = yup.object(schemaTemp).required();
  type FormData = yup.InferType<typeof schema1>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema1),
  });
  const onSubmit = (data: FormData) => console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {namesList.map((name) => (
          <div>
            <TextField variant="outlined" key={name} {...register(name)} />
            <br />
          </div>
        ))}

        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
