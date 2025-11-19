// Utilitário para requisições autenticadas
export async function authFetch(url, options = {}) {
    const token = localStorage.getItem('token');
    const headers = {
        ...(options.headers || {}),
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
    };
    return fetch(url, { ...options, headers });
}

// Exemplo de login com JWT
export async function login(email, password) {
    const res = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
        throw new Error('Login inválido');
    }
    const data = await res.json();
    if (data.token) {
        localStorage.setItem('token', data.token);
    }
    return data;
}


// Exemplo de registro com JWT
export async function register(email, password) {
    const res = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
        throw new Error('Erro ao registrar');
    }
    const data = await res.json();
    if (data.token) {
        localStorage.setItem('token', data.token);
    }
    return data;
}

export function update(){
    
}

export function deleteService(){
    
}