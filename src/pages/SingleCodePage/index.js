import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const SingleCodePage = () => {
    let params = useParams();

    const fetchPosts = async (code) => {
        const { data } = await axios.get(
            `http://10.224.49.81:30100/old_code/${code}`, {
            headers: {
                'Authorization': `token ${document.cookie}`
            }
        }
        );
        return data;
    };


    const { isLoading, error, data } = useQuery(["repoData"], () =>
        fetchPosts(params.code)
    );


    if (isLoading) return "Loading...";

    if (error || !data) return "An error has occurred: " + error?.message;

    const item = data;

    return (
        <div>
            <div>
                <b>Код:</b> {item?.ens} | {item?.vk}
            </div>
            <div>
                <b>Название:</b> {item?.name} | {item?.name_kaz}
            </div>
            <div>
                <b>State:</b> {item?.state}
            </div>
            <div>
                <b>Type:</b> {item?.type}
            </div>

            <div>
                <b>standard:</b> {item?.standard}
            </div>

            <div>
                <b>tmpl:</b> {item?.tmpl}
            </div>

            <div>
                <b>resp:</b> {item?.resp}
            </div>

            

            <div>
                <b>Характеристики:</b>
                {[...Array(10).keys()].map((num) => (
                    <div style={{ marginLeft: 20 }} key={num}>
                        {item[`attr${num + 1}`] && (
                            <li>
                                {item[`attr${num + 1}`]} | {item[`attr${num + 1}_kaz`]}
                                <br />
                            </li>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SingleCodePage;
