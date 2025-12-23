document.addEventListener("DOMContentLoaded", () => {

    // UTILIDADES DE DATOS
    function obtenerUsuarios() {
        return JSON.parse(localStorage.getItem("usuarios")) || [];
    }

    function guardarUsuarios(usuarios) {
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    function getUsuarioLogueado() {
        return localStorage.getItem("usuarioLogueado");
    }

    function getNombreUsuario() {
        const correo = getUsuarioLogueado();
        if (!correo) return null;
        const usuarios = obtenerUsuarios();
        const usuario = usuarios.find(u => u.correo === correo);
        return usuario ? usuario.usuario : correo;
    }

    function obtenerNotas() {
        return JSON.parse(localStorage.getItem("notas")) || {};
    }

    function guardarNotas(notas) {
        localStorage.setItem("notas", JSON.stringify(notas));
    }

    // PROTECCIÓN DE RUTA
    if (document.title.includes("Notas") && !getUsuarioLogueado()) {
        window.location.href = "pag_IniciarSesion.html";
    }

    // GESTIÓN DE REGISTRO
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", e => {
            e.preventDefault();
            const usuario = document.getElementById("usuario").value.trim();
            const correo = document.getElementById("correo").value.trim();
            const clave = document.getElementById("clave").value;
            const usuarios = obtenerUsuarios();

            if (usuarios.some(u => u.correo === correo)) {
                alert("Este correo ya está registrado");
                return;
            }

            usuarios.push({ usuario, correo, clave, plan: "normal" });
            guardarUsuarios(usuarios);
            alert("Cuenta creada correctamente. Ahora inicia sesión.");
            window.location.href = "pag_IniciarSesion.html";
        });
    }

    // GESTIÓN DE LOGIN
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", e => {
            e.preventDefault();
            const correo = document.getElementById("correo").value.trim();
            const clave = document.getElementById("clave").value;
            const usuarios = obtenerUsuarios();
            const valido = usuarios.find(u => u.correo === correo && u.clave === clave);

            if (!valido) {
                alert("Correo o contraseña incorrectos");
                return;
            }

            localStorage.setItem("usuarioLogueado", correo);
            window.location.href = "notas.html";
        });
    }

    // INTERFAZ DE NOTAS
    const notaForm = document.getElementById("notaForm");
    const listaNotas = document.getElementById("listaNotas");

    function mostrarNotas() {
        const usuario = getUsuarioLogueado();
        if (!listaNotas || !usuario) return;

        const notas = obtenerNotas();
        listaNotas.innerHTML = "";
        if (!notas[usuario]) return;

        notas[usuario].forEach((nota, index) => {
            const li = document.createElement("li");
            li.classList.add("nota-item");

            let icono = "📝";
            if (nota.tipo === "tarea") icono = "✅";
            if (nota.tipo === "recordatorio") icono = "⏰";

            const texto = document.createElement("span");
            texto.textContent = `${icono} ${nota.texto}`;
            texto.classList.add("nota-texto");
            texto.style.color = nota.color || "black";

            if (nota.tipo === "tarea" && nota.completada) {
                texto.classList.add("nota-completada");
            }

            if (nota.tipo === "tarea") {
                texto.classList.add("nota-tarea");
                texto.addEventListener("click", () => {
                    nota.completada = !nota.completada;
                    guardarNotas(notas);
                    mostrarNotas();
                });
            }

            const fecha = document.createElement("span");
            fecha.textContent = nota.fecha;
            fecha.classList.add("nota-fecha");

            const eliminar = document.createElement("span");
            eliminar.textContent = "Eliminar";
            eliminar.classList.add("nota-eliminar");
            eliminar.addEventListener("click", () => {
                notas[usuario].splice(index, 1);
                guardarNotas(notas);
                mostrarNotas();
            });

            let fechaExtraText = "";
            let fechaExtraColor = "#555";

            if(nota.fechaRecordatorio) {
                const partes = nota.fechaRecordatorio.split("-");
                if(partes.length === 3) {
                    const fechaObj = new Date(partes[0], partes[1]-1, partes[2]);
                    const hoy = new Date();
                    hoy.setHours(0,0,0,0);

                    if(fechaObj.getTime() === hoy.getTime()) {
                        fechaExtraColor = "#e74c3c";
                    } else if(fechaObj.getTime() < hoy.getTime()) {
                        fechaExtraColor = "#c0392b";
                    }
                    fechaExtraText = `Día: ${partes[2]}/${partes[1]}/${partes[0]}`;
                }
            }

            const fechaExtra = document.createElement("span");
            fechaExtra.textContent = fechaExtraText;
            fechaExtra.classList.add("nota-fecha-extra");
            fechaExtra.style.color = fechaExtraColor;

            li.append(texto, fechaExtra, fecha, eliminar);
            listaNotas.appendChild(li);
        });
    }

    if (notaForm) {
        notaForm.addEventListener("submit", e => {
            e.preventDefault();
            const texto = document.getElementById("notaTexto").value.trim();
            if (!texto) return;

            const usuario = getUsuarioLogueado();
            const notas = obtenerNotas();
            if (!notas[usuario]) notas[usuario] = [];

            const tipo = document.getElementById("tipoNota").value;
            const usuarios = obtenerUsuarios();
            const usuarioObj = usuarios.find(u => u.correo === getUsuarioLogueado());
            const plan = usuarioObj?.plan || "normal";
            const recordatoriosExistentes = (notas[usuario] || []).filter(n => n.tipo === "recordatorio").length;

            if(tipo === "recordatorio" && plan === "normal" && recordatoriosExistentes >= 5) {
                alert("Has alcanzado el máximo de 5 recordatorios para el plan Normal. Actualiza a Premium para ilimitados.");
                return;
            }

            let fechaRecordatorio = (tipo === "recordatorio") ? document.getElementById("fechaRecordatorio").value || "" : "";

            notas[usuario].push({
                texto,
                tipo,
                fecha: new Date().toLocaleDateString(),
                fechaRecordatorio: fechaRecordatorio,
                completada: false,
                color: colorSeleccionado
            });

            guardarNotas(notas);
            notaForm.reset();
            mostrarNotas();
        });
        mostrarNotas();
    }

    // LOGOUT
    const btnLogout = document.getElementById("btnLogout");
    if (btnLogout) {
        btnLogout.addEventListener("click", () => {
            localStorage.removeItem("usuarioLogueado");
            window.location.href = "pag_IniciarSesion.html";
        });
    }
});

// FUNCIONES DE CARGA DE INTERFAZ GLOBAL
function cargarHeaderUsuario() {
    const correo = localStorage.getItem("usuarioLogueado");
    const btnsNoAuth = document.querySelectorAll(".auth-no");
    const btnsAuth = document.querySelectorAll(".auth-yes");
    const userNameSpan = document.getElementById("userName");

    if (!correo) {
        btnsNoAuth.forEach(b => b.style.display = "inline-block");
        btnsAuth.forEach(b => b.style.display = "none");
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find(u => u.correo === correo);

    btnsNoAuth.forEach(b => b.style.display = "none");
    btnsAuth.forEach(b => b.style.display = "inline-block");

    if (usuario && userNameSpan) {
        userNameSpan.textContent = `Hola, ${usuario.usuario}`;
    }
}

function cargarPlanUsuario() {
    const correo = localStorage.getItem("usuarioLogueado");
    const userPlanP = document.getElementById("userPlan");
    if (!correo || !userPlanP) return;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find(u => u.correo === correo);
    if (!usuario) return;

    if (!usuario.plan) {
        usuario.plan = "normal";
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    if (usuario.plan === "premium") {
        userPlanP.textContent = "Plan: Premium 👑";
        userPlanP.style.color = "#b8860b";
        userPlanP.style.fontWeight = "bold";
    } else {
        userPlanP.textContent = "Plan: Normal";
        userPlanP.style.color = "#555";
    }
}

function protegerLinksAuth() {
    const usuario = localStorage.getItem("usuarioLogueado");
    if (!usuario) return;
    const links = document.querySelectorAll(".auth-link");
    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            window.location.href = "notas.html";
        });
    });
}

// EVENTOS DE DOCUMENTO
document.addEventListener("DOMContentLoaded", cargarHeaderUsuario);
document.addEventListener("DOMContentLoaded", cargarPlanUsuario);
document.addEventListener("DOMContentLoaded", protegerLinksAuth);

// GESTIÓN DE CAMPOS DINÁMICOS
const tipoNotaSelect = document.getElementById("tipoNota");
const fechaRecordatorioInput = document.getElementById("recordatorioFechaContainer");

if(tipoNotaSelect && fechaRecordatorioInput) {
    tipoNotaSelect.addEventListener("change", () => {
        fechaRecordatorioInput.style.display = (tipoNotaSelect.value === "recordatorio") ? "block" : "none";
    });
}

// SELECTOR DE COLORES PREMIUM
let colorSeleccionado = "black";
const colorCirculos = document.querySelectorAll(".color-circle");
colorCirculos.forEach(c => {
    c.addEventListener("click", () => {
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const usuarioObj = usuarios.find(u => u.correo === localStorage.getItem("usuarioLogueado"));
        const plan = usuarioObj?.plan || "normal";

        if(plan !== "premium") {
            alert("Solo los usuarios Premium pueden seleccionar colores personalizados.");
            return;
        }

        colorCirculos.forEach(c2 => c2.classList.remove("selected"));
        c.classList.add("selected");
        colorSeleccionado = c.dataset.color;
    });
});

// MENÚ DE USUARIO INTERACTIVO
document.addEventListener("DOMContentLoaded", () => {
    const userName = document.getElementById("userName");
    const userMenu = document.querySelector(".user-menu");
    if (!userName || !userMenu) return;

    userName.addEventListener("click", (e) => {
        e.stopPropagation();
        userMenu.classList.toggle("open");
    });

    document.addEventListener("click", () => {
        userMenu.classList.remove("open");
    });
});

// ACTIVACIÓN DE PLAN PREMIUM
document.addEventListener("DOMContentLoaded", () => {
    const btnPremium = document.getElementById("btnPremium");
    if (!btnPremium) return;

    btnPremium.addEventListener("click", () => {
        const correo = localStorage.getItem("usuarioLogueado");
        if (!correo) {
            alert("Debes iniciar sesión para activar el Plan Premium");
            window.location.href = "pag_IniciarSesion.html";
            return;
        }

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const index = usuarios.findIndex(u => u.correo === correo);
        if (index === -1) return;

        if (usuarios[index].plan === "premium") {
            alert("El Plan Premium ya está activo en esta cuenta");
            return;
        }

        usuarios[index].plan = "premium";
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        alert("Plan Premium activado correctamente");
        location.reload();
    });
});