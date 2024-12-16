import { sendMailToPaciente } from "../config/nodemailer.js"
import Paciente from "../models/Paciente.js"

const registrarPaciente = async (req, res) => {
    // Paso 1 - Tomar datos del request
    const {email}= req.body

    // Paso 2 - Validar datos
    if(Object.values(req.body).includes(""))
      return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})

    const verificarEmailBDD = await Paciente.findOne({email})
    if(verificarEmailBDD)
      return res.status(400).json({msg:"Lo sentimos, el email ya se encuentra registrado"})

    // Paso 3 - Interactuar BDD
    const nuevoPaciente = new Paciente(req.body)

    const password = Math.random().toString(36).slice(2)
    nuevoPaciente.password = await nuevoPaciente.encrypPassword("vet"+password)
    await sendMailToPaciente(email,"vet" + password)

    nuevoPaciente.veterinario = req.veterinarioBDD._id
    await nuevoPaciente.save()

    res.status(200).json({msg:"Registro exitoso del paciente y correo enviado al dueño"})
}
const listarPaciente = async (req, res) => {
    // Paso 1 - Tomar datos del request
    // Paso 2 - Validar datos
    // Paso 3 - Interactuar BDD
    const pacientes = await Paciente.findOne({estado:true}).populate('veterinario',"nombre apellido").select("-estado -__v").where('veterinario').equals(req.veterinarioBDD)
    res.status(200).json(pacientes)
  
}
const detallePaciente = (req, res) => {
  res.send("Detalle del Paciente")
}
const actualizarPaciente = (req, res) => {
  res.send("Paciente actualizado")
}
const eliminarPaciente = (req, res) => {
  res.send("Paciente eliminado")
}

const loginPaciente = (req, res) => {
  res.send("Dueño inicio de sesion")
}
const perfilPaciente = (req, res) => {
  res.send("Dueño puede ver su perfil")
}

export{
  registrarPaciente,
  listarPaciente,
  detallePaciente,
  actualizarPaciente,
  eliminarPaciente,
  loginPaciente,
  perfilPaciente
}