import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";

const NewCodesPage = () => {
    const [title, setTitle] = useState("");
    const [result, setResult] = useState("");
  const { isLoading, error, data } = useQuery(["repoData"], () =>
    fetch("http://10.224.49.81:30100/code", {
        headers: {
            'Authorization': `token ${document.cookie}`
        }
    }).then((res) =>
      res.json()
    )
  );

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const getCode = async () => {
    axios.get(`http://10.224.49.81:30100/search/code/${title}`, {
        headers: {
            'Authorization': `token ${document.cookie}`
        }
    })
      .then(res => {
        setResult(res)
      })
      .catch((error) => {
        setResult(null)
      })
  };

  if (isLoading) return "Loading...";

  if (error || !data.results) return "An error has occurred: " + error?.message;

  return (
    <div>
        
        <input
            className="form-control"
            placeholder="На русском"
            type="text"
            onChange={onChangeTitle}
          />
          <button className="btn btn-primary"  onClick={getCode}>
          Поиск
        </button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Название</th>
            <th scope="col">ENS</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            !result ?
            data.results.map((item) => (
            <tr key={item.id}>
              <th scope="row">{item.id}</th>
              <td>
                {item.name}
                <br />
                {item.name_kz}
              </td>
              <td>
                {item.code} <br /> {item.short_code}
              </td>
              <td>
                <Link to={`/viewNewCode/${item?.id}`} className="btn btn-primary mb-2">Посмотреть</Link>
                <br />
              </td>
            </tr> 
          )): <div></div> }

          {result ?
         
            result.data.results.map((item) => (
            <tr key={item.id}>
              <th scope="row">{item.id}</th>
              <td>
                {item.name}
                <br />
                {item.name_kz}
              </td>
              <td>
                {item.code} <br /> {item.short_code}
              </td>
              <td>
                <Link to={`/viewNewCode/${item?.id}`} className="btn btn-primary mb-2">Посмотреть</Link>
                <br />
              </td>
            </tr>
          ))
          : <div></div>
          }
        </tbody>
      </table>
    </div>
  );
};

export default NewCodesPage;
