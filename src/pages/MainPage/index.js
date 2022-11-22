import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const MainPage = () => {
    const [nextLink, setNextLink] = useState("")
    const [prevLink, setPrevLink] = useState("")
    const [table, setTable] = useState("")

    let params = useParams();

    const fetchPosts = async (code) => {
        const { data } = await axios.get(
            `http://10.224.49.81:30100/old_code/`, {
            headers: {
                'Authorization': `token ${document.cookie}`
            }
        }
        );
        setTable(data)
        setNextLink(data.next)
        return data;
    };


    const { isLoading, error, data } = useQuery(["repoData"], () =>
        fetchPosts(params.code)
    );

    const nextPage = () => {
        axios.get(`${nextLink}`, {
            headers: {
                'Authorization': `token ${document.cookie}`
            }
        })
            .then(res => {
                setTable(res.data)
                setNextLink(res.data.next)
                setPrevLink(res.data.previous)
            })
    }

    const prevPage = () => {
        axios.get(`${prevLink}`, {
            headers: {
                'Authorization': `token ${document.cookie}`
            }
        })
            .then(res => {
                setTable(res.data)
                setNextLink(res.data.next)
                setPrevLink(res.data.previous)
            })
    }


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
                    {table && table.results.map((item) => (
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
            <div>
                {prevLink && <button onClick={prevPage}>
                    &lt;
                </button>}
                {nextLink && <button onClick={nextPage}>
                    &gt;
                </button>}

            </div>
        </div>
    );
};

export default MainPage;
