import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axios from "axios";

const MainPage = () => {
  const { isLoading, error, data } = useQuery(["repoData"], () =>
    fetch("http://10.224.49.81:30100/old_code", {
        headers: {
            'Authorization': `token ${document.cookie}`
        }
    }).then((res) =>
      res.json()
    )
  );

  if (isLoading) return "Loading...";

  if (error || !data.results) return "An error has occurred: " + error?.message;

  return (
    <div>
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
          {data.results.map((item) => (
            <tr key={item.id}>
              <th scope="row">{item.id}</th>
              <td>
                {item.name}
                <br />
                {item.name_kaz}
              </td>
              <td>
                {item.ens} <br /> {item.vk}
              </td>
              <td>
                <Link to={`/code/${item?.id}`} className="btn btn-primary mb-2">Посмотреть</Link>
                <br />
                <Link to={`/edit/${item?.id}`} className="btn btn-secondary">Изменить</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MainPage;
