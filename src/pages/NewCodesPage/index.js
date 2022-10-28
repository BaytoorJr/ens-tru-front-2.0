import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const NewCodesPage = () => {
  const { isLoading, error, data } = useQuery(["repoData"], () =>
    fetch("http://10.224.49.81:30100/code").then((res) =>
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewCodesPage;
