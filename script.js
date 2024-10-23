function generatorLoan() {
    document.getElementById("tab").innerHTML = "";
    const P = Number(document.getElementById("capital").value);
    const n = Number(document.getElementById("cuota").value);
    const c = Number(document.getElementById("comision").value);
    let i = Number(document.getElementById("intereses").value)/100;

    const tipoTasa = String(document.getElementById("tipoTasa").value);
    if (tipoTasa === "TEA") {
        i = Math.pow(1 + i, 1/12) - 1;
    }

    if (P > 0) {
        let saldo = P;
        let interesTotal = 0;
        let amortizacionTotal = 0;
        let cuotaTotal = 0;
        let comisionTotal = 0;
        for (let mes = 0; mes <= n; ++mes) {
            if (mes == 0) {
                document.getElementById("tab").innerHTML = document.getElementById("tab").innerHTML +
                `<tr>
                    <td>${mes}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>S/ ${saldo.toFixed(2)}</td>
                </tr>`;
            } else {
                const Cuota = P * (Math.pow(1 + i, n) * i) / (Math.pow(1 + i, n) - 1) + c;
                const interes = saldo * i;
                const amortizacion = Cuota - interes - c;
                saldo -= amortizacion;

                document.getElementById("tab").innerHTML = document.getElementById("tab").innerHTML +
                `<tr>
                    <td>${mes}</td>
                    <td>S/ ${Cuota.toFixed(2)}</td>
                    <td>S/ ${Math.round(interes).toFixed(2)}</td>
                    <td>S/ ${amortizacion.toFixed(2)}</td>
                    <td>S/ ${Math.abs(saldo.toFixed(2))}</td>
                    <td>S/ ${c.toFixed(2)}</td>
                </tr>`;

                interesTotal += interes;
                amortizacionTotal += amortizacion;
                cuotaTotal += Cuota;
                comisionTotal += c;
            }
        }

        document.getElementById("t1").innerHTML = "S/ " + Math.round(cuotaTotal.toFixed(2)).toFixed(2);
        document.getElementById("t2").innerHTML = "S/ " + Math.round(interesTotal.toFixed(2)).toFixed(2);
        document.getElementById("t3").innerHTML = "S/ " + amortizacionTotal.toFixed(2);
        document.getElementById("t5").innerHTML = "S/ " + comisionTotal.toFixed(2);
    } else {
        alert("Falta ingresar los números");
    }
}
