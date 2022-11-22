import { useParams } from "react-router-dom";
import { useQuery, useMutation, queryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const createNewCode = async (data) => {
  const { data: response } = await axios.post(
    "http://10.224.49.81:30100/code/",
    data, {
        headers: {
            'Authorization': `token ${document.cookie}`
        }
    }
  );
  return response;
};

const createNewCharacteristic = async (data) => {
  const { data: response } = await axios.post(
    "http://10.224.49.81:30100/characteristics/",
    data, {
        headers: {
            'Authorization': `token ${document.cookie}`
        }
    }
  );
  return response;
};

const EditCodePage = () => {
  let params = useParams();
  const navigate = useNavigate();
  const [counter, setCounter] = useState(0);
  const [characteristicsArray, setCharacteristicsArray] = useState([]);
  const [author, setAuthor] = useState("");
  const [attributes, setAttributes] = useState({});
  const [category, setCategory] = useState(0);
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const { mutate } = useMutation(createNewCode, {
    onSuccess: (data) => {
      const message = "success";
      console.log(message);
      
      navigate("/newCodes")
    },
    onError: () => {
      console.log("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  const { mutate: mutateCharacteristic } = useMutation(
    createNewCharacteristic,
    {
      onSuccess: (data) => {
        const message = "success";
        console.log(message);
        console.log("Characteristic", data);
        if (data?.id) {
          setCharacteristicsArray([...characteristicsArray, data.id]);
        }
      },
      onError: (error) => {
        console.log(error, "there was an error");
      },
      onSettled: () => {
        queryClient.invalidateQueries("create");
      },
    }
  );

  const {
    isLoading: isLoadingCode,
    error: errorCode,
    data: dataCode,
  } = useQuery(["repoData"], () =>
    fetch(`http://10.224.49.81:30100/old_code/${params.code}`, {
        headers: {
            'Authorization': `token ${document.cookie}`
        }
    }).then((res) =>
      res.json()
    )
  );

  const {
    isLoading: isLoadingCategory,
    error: errorCategory,
    data: dataCategory,
  } = useQuery(["repoMyData"], () =>
    fetch(`http://10.224.49.81:30100/category/`, {
        headers: {
            'Authorization': `token ${document.cookie}`
        }
    }).then((res) => res.json())
  );

  if (isLoadingCode || isLoadingCategory) return "Loading...";

  if (errorCode || !dataCode || errorCategory || !dataCategory)
    return "An error has occurred: " + errorCode?.message;

  const item = dataCode;

  const handleClick = () => {
    if (counter !== 0) {
      mutateCharacteristic({
        name: attributes.name,
        characteristic_values: [
          {
            value: attributes.name,
            unit: attributes.unit,
            maximum: attributes.maximum,
            minimum: attributes.minimum,
          },
        ],
      });
      setAttributes({});
    }

    setCounter(counter + 1);
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };
  console.log(characteristicsArray);

  const handleSubmit = () => {
    mutate({
      name: item.name,
      name_kz: item.name_kaz,
      author: author,
      characteristics: characteristicsArray,
      code: item.ens,
      short_code: item.vk,
      ...(category && { category: category }),
    });
  };

  const handleStandard = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  return (
    <div>
      <div>
        <b>Код: </b> {item.ens} | {item.vk}
      </div>
      <div>
        <b>Название: </b> {item.name} | {item.name_kaz}
      </div>
      <div>
        Категория:
        <select className="form-select" onChange={handleChangeCategory}>
          <option value={0} key={0}>
            Не выбрано
          </option>
          {dataCategory?.results?.map((item) => (
            <option value={item.id} key={item.id}>
              {item.id} {item.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <b>Характеристики:</b>
        {Array.from(Array(counter)).map((c, index) => {
          return (
            <div>
              <div className="input-group mb-3 col-sm">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    id="inputGroup-sizing-default"
                  >
                    Название характеристики
                  </span>
                </div>
                <input
                  key={c}
                  type="text"
                  onChange={(e) => {
                    setAttributes({
                      ...attributes,
                      name: e.target.value,
                    });
                  }}
                  className="form-control"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>
              <div className="row">
                <div className="input-group mb-3 col-sm">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-default"
                    >
                      Значение
                    </span>
                  </div>
                  <input
                    type="text"
                    onChange={(e) => {
                      setAttributes({
                        ...attributes,
                        value: e.target.value,
                      });
                    }}
                    className="form-control"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </div>
                <div className="input-group mb-3 col-sm">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-default"
                    >
                      Метрика
                    </span>
                  </div>
                  <input
                    type="text"
                    onChange={(e) => {
                      setAttributes({
                        ...attributes,
                        unit: e.target.value,
                      });
                    }}
                    className="form-control"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </div>
              </div>
              <div>
                <div className="input-group mb-3 col-sm">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-default"
                    >
                      Минимум
                    </span>
                  </div>
                  <input
                    type="text"
                    onChange={(e) => {
                      setAttributes({
                        ...attributes,
                        minimum: e.target.value,
                      });
                    }}
                    className="form-control"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </div>
                <div className="input-group mb-3 col-sm">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-default"
                    >
                      Максимум
                    </span>
                  </div>
                  <input
                    type="text"
                    onChange={(e) => {
                      setAttributes({
                        ...attributes,
                        maximum: e.target.value,
                      });
                    }}
                    className="form-control"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </div>
                <hr />
              </div>
            </div>
          );
        })}

        <button onClick={handleClick} className="btn btn-primary">
          Добавить
        </button>
      </div>

      <div className="mb-3 mt-3">
        <b>Автор: </b>
        <input
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
          type="text"
          className="form-control"
          style={{ maxWidth: 400 }}
        />
      </div>

      <div>
        <input type="file" name="picture" onChange={handleStandard} />
      </div>

      <button className="btn btn-success" onClick={handleSubmit}>
        Отправить
      </button>
    </div>
  );
};

export default EditCodePage;
