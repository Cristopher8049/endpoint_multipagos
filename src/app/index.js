const {
  DisconnectReason,
  useSingleFileAuthState,
} = require("@adiwajshing/baileys");
const makeWASocket = require("@adiwajshing/baileys").default;
const { sleep } = require("./utilities");
const { pushUsers } = require("./database");
const fs = require("fs");

let sock = null;
let authInfo = null;

const connect = function () {
  const { state, saveState } = useSingleFileAuthState("./auth_info_multi.json");
  sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
  });
  sock.ev.on("creds.update", saveState);

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) {
        connect();
      }
    } else if (connection === "open") {
      console.log("Conectado a WA!");
    }
  });
};

const sendMessage = async (params, res) => {
  let coutMessage = 0;
  let coutTotal = 0;
  let time = new Date();
  let codeStatus = 0;

  if (!sock) {
    const dataRes = { msg: "Sesión no iniciada.", data: {} };
    return res.json(dataRes);
  }

  const id = `${params.phone}@s.whatsapp.net`;

  try {
    await sock.sendMessage(id, { text: params.message });
    if (params.img !== "null") {
      await sock.sendMessage(id, {
        image: { url: params.img },
        caption: "",
      });
    }
    if (params.pdf !== "null") {
      await sock.sendMessage(id, {
        document: { url: params.pdf },
        caption: "",
      });
    }

    console.log(`Mensaje enviado correctamente a ${params.phone} | ${time}.`);
    codeStatus = 505;

    pushUsers(async (conn) => {
      coutTotal++;
      conn.query("INSERT INTO reports (phone, time, status) VALUES (?,?,?)", [
        params.phone,
        time,
        codeStatus,
      ]);
      conn.end();

      dataRes = { msg: "Enviado Correctamente" };
      res.json(dataRes);
    });
  } catch (err) {
    console.log(err);
    if (err) {
      dataRes = { msg: "Ocurrió un error desconocido", data: err };
      codeStatus = 404;
    }
  }
};

const get_enviarmensaje = async (req, res) => sendMessage(req.query, res);

const post_enviarmensaje = async (req, res) => sendMessage(req.body, res);

const close = async (req, res) => {
  if (fs.existsSync("./auth_info_multi.json"))
    fs.rmSync("./auth_info_multi.json");
  if (authInfo != null) authInfo = null;
  if (sock.state == "open" || sock.state == "connecting") {
    await sock.close();
    sock = null;
  }
  if (res !== null) res.jsonp({ msg: "Sesion cerrada con exito", data: {} });
};

module.exports = {
  connect,
  get_enviarmensaje,
  post_enviarmensaje,
  close,
  sendMessage,
};
