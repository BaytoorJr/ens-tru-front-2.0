import React, { useState } from "react";
import axios from "axios";

const Authorization = () => {
    const url = "http://10.224.49.81:30100/api-token-auth/"
    axios.post(url, {
        "username": "admin",
        "password": "admin"
      }).then(response => {
        console.log(response.data['token'])
      })

    // axios.get('http://10.224.49.81:30100/code', {
    // headers: {
    //     'Authorization': `token ca5c29290e45d36eda54cb8df54e26e99f69636b`
    // }
    // })
    // .then((res) => {
    // console.log(res.data)
    // })
    // .catch((error) => {
    // console.error(error)
    // })

    return (
        <div>
            <form>
                <input />
                <input />
            </form>
        </div>
    )
}

export default Authorization;