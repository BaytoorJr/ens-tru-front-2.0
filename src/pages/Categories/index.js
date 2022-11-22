import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, queryClient } from "@tanstack/react-query";
import axios from "axios";

const createNewCategory = async (data) => {
  const { data: response } = await axios.post(
    "http://10.224.49.81:30100/category/",
    data, {
        headers: {
            'Authorization': `token ${document.cookie}`
        }
    }
  );
  return response.data;
};

const Categories = () => {
  const [name, setName] = useState("");
  const [nameKz, setNameKz] = useState("");
  const [parentCategory, setParentCategory] = useState(0);

  const { isLoading, error, data } = useQuery(["repoData"], () =>
    fetch(`http://10.224.49.81:30100/category/`, {
        headers: {
            'Authorization': `token ${document.cookie}`
        }
    }).then((res) => res.json())
  );

  const { mutate } = useMutation(createNewCategory, {
    onSuccess: (data) => {
      const message = "success";
      console.log(message);
    },
    onError: () => {
      console.log("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  if (isLoading) return "Loading...";

  if (error || !data.results) return "An error has occurred: " + error?.message;

  const handleAddCategory = () => {

    mutate({
      name: name,
      name_kz: nameKz,
      ...(!!parentCategory && { parent_category: parentCategory }),
    });
    setName("");
    setNameKz("");
    setParentCategory(0);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeNameKz = (event) => {
    setNameKz(event.target.value);
  };

  const handleChangeParentCategory = (event) => {
    setParentCategory(event.target.value);
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Название</th>
            {/* <th scope="col">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {data.results.map((item) => (
            <tr key={item.id}>
              <th scope="row">{item.id}</th>
              <td>
                {item.name}
                <br />
                {item.name_kz}
              </td>
              {/* <td>
                <Link to={`/edit/${item?.id}`} className="btn btn-secondary">
                  Изменить
                </Link>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>
          <label htmlFor="exampleInputEmail1" className="form-label">
            Название
          </label>
          <input
            className="form-control"
            placeholder="На русском"
            type="text"
            onChange={handleChangeName}
          />
        </div>

        <div>
          <label htmlFor="exampleInputEmail1" className="form-label">
            Аты
          </label>
          <input
            className="form-control"
            placeholder="Қазақша"
            type="text"
            onChange={handleChangeNameKz}
          />
        </div>

        <div>
          <label htmlFor="exampleInputEmail1" className="form-label">
            Родительская категория
          </label>
          <select className="form-select" onChange={handleChangeParentCategory}>
            <option value={0} key={0}>
              Не выбрано
            </option>
            {data.results.map((item) => (
              <option value={item.id} key={item.id}>
                {item.id} {item.name}
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleAddCategory} className="btn btn-primary">
          Добавить
        </button>
      </div>
    </div>
  );
};

export default Categories;
