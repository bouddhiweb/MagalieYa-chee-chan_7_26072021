export const register = (datas) => {
    // console.log(datas)
    const userId = datas.userId;
    const token = datas.token;
    const title = datas.title;
    const url = datas.url;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Accept", 'application/json');
    myHeaders.append("Content-Type", 'application/json');

    const raw = {
        userId: userId,
        token: token,
        title: title,
        url: url,
    };
    // console.log(myHeaders);
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
        body: JSON.stringify(raw),
    };

    fetch("http://localhost:3000/content/create", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

export const deleteOneAccount = (datas) => {
    // console.log(datas)
    const userId = datas.userId;
    const token = datas.token;
    const title = datas.title;
    const url = datas.url;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Accept", 'application/json');
    myHeaders.append("Content-Type", 'application/json');

    const raw = {
        userId: userId,
        token: token,
        title: title,
        url: url,
    };
    // console.log(myHeaders);
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
        body: JSON.stringify(raw),
    };

    fetch("http://localhost:3000/content/create", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

export const deleteOwnAccount = (datas) => {
    // console.log(datas)
    const userId = datas.userId;
    const token = datas.token;
    const title = datas.title;
    const url = datas.url;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Accept", 'application/json');
    myHeaders.append("Content-Type", 'application/json');

    const raw = {
        userId: userId,
        token: token,
        title: title,
        url: url,
    };
    // console.log(myHeaders);
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
        body: JSON.stringify(raw),
    };

    fetch("http://localhost:3000/content/create", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

export const changePwd = (datas) => {
    console.log(datas)
    const token = datas.token;
    const userId = datas.userId;
    const newPassword = datas.newPassword;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Accept", 'application/json');
    myHeaders.append("Content-Type", 'application/json');
    const info = {
        token: token,
        userId: userId,
        newPassword: newPassword,
    };
    console.log(info);
    const requestOptions = {
        headers: myHeaders,
        method: 'POST',
        redirect: 'follow',
        body: JSON.stringify(info),

    };

    fetch("http://localhost:3000/auth/update", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

