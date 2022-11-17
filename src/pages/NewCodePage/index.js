import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const NewCodePage = () => {
  let params = useParams();

  const { isLoading, error, data } = useQuery(["repoData"], () =>
    fetch(`http://10.224.49.81:30100/code/${params.code}`, {
        headers: {
            'Authorization': `token ${document.cookie}`
        }
    }).then((res) =>
      res.json()
    )
  );

  if (isLoading) return "Loading...";

  if (error || !data) return "An error has occurred: " + error?.message;

  const item = data;

  return (
    <div>
      <div>
        <b>Код: </b>
        {item?.code} | {item?.shortCode}
      </div>
      <div>
        <b>Название: </b>
        {item?.name} | {item?.name_kz}
      </div>
      <div>
        <b>Автор: </b> {item?.author}
      </div>
      <div>
        <b>Характеристики:</b>
        <div style={{ marginLeft: 20 }}>
          {!!item?.characteristics &&
            Object.entries(item?.characteristics).map((myItem) => {
              return (
                <li key={myItem[1].id} className="row">
                  <b>{myItem[1].name}:</b>
                  {myItem[1].characteristic_values.map((item) => (
                    <div className="row">
                      <i>{item.value} {item.unit}</i>
                      <br />
                      <div>min: {item.minimum}</div>
                      <div>max: {item.maximum}</div>
                    </div>
                  ))}
                  <br />
                </li>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default NewCodePage;
