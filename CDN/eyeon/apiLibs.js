export default async function setup({ API_BASE_URL, adminKey }) {
    const defaultHeaders = {
        "Content-Type": "application/json",
    };

    return {
        version: "1.0.0",
        // Public APIs
        hello: () => fetch(`${API_BASE_URL}/`, { method: "GET" }),

        registerUser: (username, password, comment) =>
            fetch(`${API_BASE_URL}/users/register`, {
                method: "POST",
                headers: defaultHeaders,
                body: JSON.stringify({ username, password, comment }),
            }),

        loginUser: (username, password) =>
            fetch(`${API_BASE_URL}/users/login`, {
                method: "POST",
                headers: defaultHeaders,
                body: JSON.stringify({ username, password }),
            }),

        getUserInfo: (token) =>
            fetch(`${API_BASE_URL}/users/me`, {
                method: "GET",
                headers: {
                    ...defaultHeaders,
                    Authorization: `Bearer ${token}`,
                },
            }),

        updateUserInfo: (token, comment) =>
            fetch(`${API_BASE_URL}/users/update`, {
                method: "POST",
                headers: {
                    ...defaultHeaders,
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ comment }),
            }),

        // Log Management
        addLog: (token, level, lecture, extra) =>
            fetch(`${API_BASE_URL}/logs/add`, {
                method: "POST",
                headers: {
                    ...defaultHeaders,
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ log: { level, lecture, extra } }),
            }),

        getLogs: (token, options = {}) => {
            const headers = {
                ...defaultHeaders,
                Authorization: `Bearer ${token}`,
            };
            // if (options.username) headers["x-user-name"] = options.username.trim();
            if (options.lecture) headers["x-lecture"] = options.lecture.trim();
            if (options.startDate) headers["x-start-time"] = options.startDate;
            if (options.endDate) headers["x-end-time"] = options.endDate;
            if (options.page) headers["x-page"] = options.page; // 페이지 번호 추가
            if (options.num) headers["x-num"] = options.num;   // 한 페이지 항목 수 추가

            return fetch(`${API_BASE_URL}/logs/list`, {
                method: "GET",
                headers,
            });
        },

        getAdminLogs: (options) => {
            const headers = {
                "x-admin-key": adminKey,
                ...defaultHeaders,
            };
            if (options.username) headers["x-user-name"] = options.username.trim();
            if (options.lecture) headers["x-lecture"] = options.lecture.trim();
            if (options.startDate) headers["x-start-time"] = options.startDate;
            if (options.endDate) headers["x-end-time"] = options.endDate;
            if (options.page) headers["x-page"] = options.page; // 페이지 번호 추가
            if (options.num) headers["x-num"] = options.num;   // 한 페이지 항목 수 추가

            return fetch(`${API_BASE_URL}/admin/logs/list`, {
                method: "GET",
                headers,
            })
        },
        deleteLogs: (ids) =>
            fetch(`${API_BASE_URL}/admin/logs/delete`, {
                method: "POST",
                headers: {
                    "x-admin-key": adminKey,
                    ...defaultHeaders,
                },
                body: JSON.stringify({ ids }),
            }),

        // Admin APIs
        checkAdminAuth: () =>
            fetch(`${API_BASE_URL}/admin/`, {
                method: "GET",
                headers: {
                    "x-admin-key": adminKey,
                },
            }),

        listUsers: (page, num) =>
            fetch(`${API_BASE_URL}/admin/users/list`, {
                method: "GET",
                headers: {
                    "x-admin-key": adminKey,
                    "x-page": page,
                    "x-num": num
                },
            }),

        deleteUser: (username) =>
            fetch(`${API_BASE_URL}/admin/users/delete`, {
                method: "POST",
                headers: {
                    "x-admin-key": adminKey,
                    ...defaultHeaders,
                },
                body: JSON.stringify({ username }),
            }),

        addUser: (username, password, comment) =>
            fetch(`${API_BASE_URL}/admin/users/add`, {
                method: "POST",
                headers: {
                    "x-admin-key": adminKey,
                    ...defaultHeaders,
                },
                body: JSON.stringify({ username, password, comment }),
            }),

        updateUser: (username, password, comment) =>
            fetch(`${API_BASE_URL}/admin/users/update`, {
                method: "POST",
                headers: {
                    "x-admin-key": adminKey,
                    ...defaultHeaders,
                },
                body: JSON.stringify({ username, password, comment }),
            }),

        getUserDetails: (username) =>
            fetch(`${API_BASE_URL}/admin/users/info`, {
                method: "GET",
                headers: {
                    "x-admin-key": adminKey,
                    'x-user-name': username
                },
            }),
    };
}
