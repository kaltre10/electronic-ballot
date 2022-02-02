import numeroALetras from "./numeroALetras";

const postApi = ({
    selectDoc,
    numDoc,
    customer,
    tipo,
    moneda,
    cantidad,
    cotizacion,
    monedaR,
    result}) => {

        let montoTex = numeroALetras(Number(result), {
            plural: 'SOLES',
            singular: 'SOL',
            centPlural: 'CENTIMOS',
            centSingular: 'CENTIMO'
          });

        const token = process.env.REACT_APP_TOKEN_API;
  
        const data = {
            "ublVersion": "2.1",
            "tipoOperacion": "0101",
            "tipoDoc": "03",
            "serie": "B001",
            "correlativo": "1", //0
            "fechaEmision": "2022-01-23T00:00:00-05:00",
            "formaPago": {
              "moneda": "PEN",
              "tipo": "Contado"
            },
            "tipoMoneda": "PEN",
            "client": {
              "tipoDoc": Number(selectDoc),
              "numDoc": Number(numDoc),
              "rznSocial": customer,
              "address": {
                "direccion": "LIMA",
                "provincia": "LIMA",
                "departamento": "LIMA",
                "distrito": "LIMA",
                "ubigueo": "150101"
              }
            },
            "company": {
              "ruc": process.env.REACT_APP_NUMBER,
              "razonSocial": process.env.REACT_APP_NAME,
              "nombreComercial": process.env.REACT_APP_COMMERCE,
              "address": {
                "direccion": process.env.REACT_APP_ADDRESS,
                "provincia": "LIMA",
                "departamento": "LIMA",
                "distrito": "LIMA",
                "ubigueo": "150101"
              }
            },
            "mtoOperGravadas": Number(result),
            "mtoIGV": 0,
            "valorVenta": Number(result),
            "totalImpuestos": 0,
            "subTotal": Number(result),
            "mtoImpVenta": Number(result),
            "details": [
              {
                "codProducto": "P001",
                "unidad": "NIU",
                "descripcion": tipo == "COMPRA" ? "COMPRA DE DÓLARES" : "VENTA DE DÓLARES",
                "cantidad": Number(cantidad),
                "mtoValorUnitario": Number(cotizacion),
                "mtoValorVenta": Number(result),
                "mtoBaseIgv": Number(result),
                "porcentajeIgv": 18,
                "igv": 18,
                "tipAfeIgv": 10,
                "totalImpuestos": 18,
                "mtoPrecioUnitario": Number(cotizacion)
              }
            ],
            "legends": [
              {
                "code": "1000",
                "value": montoTex
              }
            ]
        }

    return fetch(process.env.REACT_APP_URL_API,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(data)
    });
}

export default postApi;