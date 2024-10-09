function generatorLoan() {
    document.getElementById("tab").innerHTML = "";
    const capital = Number(document.getElementById("capital").value);
    const cuota = Number(document.getElementById("cuota").value);
    const interes = Number(document.getElementById("intereses").value);
    const comision = Number(document.getElementById("comision").value);  // Nuevo campo para la comisión mensual

    if (capital > 0) {
        let tem = Math.pow(1 + (interes / 100), 1 / 12) - 1;
        let saldo = capital;
        let totalInteres = 0;
        let totalAmortizacion = 0;
        let MontoCuota = 0;
        let totalComision = 0;  // Variable para el total de comisiones

        for (let mes = 0; mes <= cuota; ++mes) {
            if (mes == 0) {
                document.getElementById("tab").innerHTML +=
                `<tr>
                    <td>${mes}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>S/ ${saldo.toFixed(2)}</td>
                </tr>`;
            } else {
                const totalCuota = (capital * tem / (1 - Math.pow(1 + tem, -cuota))) + comision;
                const totalCuotaRed = totalCuota.toFixed(2);

                const interesSaldo = saldo * tem;
                const interesSaldoRed = interesSaldo.toFixed(2);

                const amortizacion = totalCuota - interesSaldo - comision;
                const amortizacionRed = amortizacion.toFixed(2);

                saldo -= amortizacion;

                document.getElementById("tab").innerHTML +=
                            `<tr>
                                <td>${mes}</td>
                                <td>S/ ${totalCuotaRed}</td>
                                <td>S/ ${interesSaldoRed}</td>
                                <td>S/ ${amortizacionRed}</td>
                                <td>S/ ${Math.abs(saldo.toFixed(2))}</td>
                                <td>S/ ${comision}</td>
                            </tr>`;

                totalInteres += interesSaldo;
                totalAmortizacion += amortizacion;
                MontoCuota += totalCuota;
                totalComision += comision;
            }
        }

        let totalInteresRed = Math.round(totalInteres.toFixed(2));
        let totalMontoCuota = Math.round(MontoCuota.toFixed(2));
        let totalAmortizacionRed = totalAmortizacion.toFixed(2);

        document.getElementById("t1").innerHTML = "S/ " + totalMontoCuota.toFixed(2);
        document.getElementById("t2").innerHTML = "S/ " + totalInteresRed.toFixed(2);
        document.getElementById("t3").innerHTML = "S/ " + totalAmortizacionRed;
        document.getElementById("t5").innerHTML = "S/ " + totalComision.toFixed(2);  // Mostrar el total de comisiones
    } else {
        alert("Falta ingresar los números");
    }
}
