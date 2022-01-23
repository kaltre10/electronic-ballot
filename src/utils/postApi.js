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

        const token = "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NDI5NTExODIsImV4cCI6NDc5NjU1MTE4MiwidXNlcm5hbWUiOiJKYXNvbiIsImNvbXBhbnkiOiIxMDAxMjM0NTY3OCJ9.pyC-AashL_VczRTbRxMedZtDs-KapgBnSMIa-EE4Y3aZ9YiMz1S3eaE2CmnvwlkbCiCIJ7trUEEaW17-GGd4WDSf3dEPZF8ZJiiLDJc6Weuzxo0lebyLdXA2HX5bvteHMVpcKV1mXmudMDwAe9rdGm0oQNrAG30oJTZOYNRYeBkzSdtXmKAxQcqSecq-_nDzIVe-1taeB2LFi7r15zg9zMD5X64_72lK4LLSYZFFYCB6t6YZeOyGP66OJqEQBda0_sZkkidX54T0oZdv5EULpM8s_tBeewCsb4859z1MZCcUjxZ8YN2qRH7pznLM74fpPc55ECEDfr9AzvSAGNDCmAdiWJDCMFgrkpgjyv9FdO8TBm6TgXwcsBsqKUrTHm4Bga-H_EtzKTJ9Ze2c0_dOKF6YZz2SdJzkuu-cJvKDHU6Xs94sCL23_xtVxN_hFbOwaC8kJxdQWqxOWhv2ZLUWDV6tjaKUzijxwGvS1mDkrXGqccGqOADnJVg7mNx1gRLFZmCg-t4FWPawB8VjZnJaEOiYwWEyBRMQpPc0q_JQFZG1M2QN0cbfkmM7m-o7vuet1erPruuXmLh31JVNldIXcV_l9HomEHvk167yFn-kgbyy-rkueMIUWQ11GokpXssJbdZKQLo-bZvpbpa1NmTSCp-kFXd8Tt4OuD06f5Nuy3o";
  
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
              "ruc": 10012345678,
              "razonSocial": "EL FIEL",
              "nombreComercial": "EL FIEL",
              "address": {
                "direccion": "Direccion empresa",
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

    //https://facturacion.apisperu.com/api/v1/invoice/send

    return fetch('https://facturacion.apisperu.com/api/v1/invoice/pdf',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(data)
    });
    // console.log(JSON.stringify(data))
}

export default postApi;