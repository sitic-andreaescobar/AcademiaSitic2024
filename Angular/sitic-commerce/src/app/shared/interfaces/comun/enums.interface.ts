export enum ScreenStatus {
    None,
    Adding,
    Updating,
    ViewDetail
}

export enum ErrorResponse {
    Ninguno = 0,
    NoDisponible = 1,
    NoAutorizado = 2,
    ParametroVacio = 3,
    ErrorSQL = 4,
    ErrorServidor = 5,
    SesionNoIniciada = 6,
    ReferenciaNula = 7,
    BloqueoRegistro = 8,
    RegistroNoGuardado = 9,
    BuscarArticuloNoEncontrado = 10,
    Validacion = 11,
    SesionNoEncontrada = 12,
    UsuarioAutenticado = 13,
    UsuarioDenegado = 14,
    UsuarioNoAutenticado = 15,
    ErrorPoliza = 16,
    SinPermisoAcceso = 17,
    ValidacionConReintento = 18,
    RequiereConfirmacion = 19,
    ValidacionSinDetenerProceso = 20,
    BadRequest = 400,
    MetodoNoEncontrado = 404
}