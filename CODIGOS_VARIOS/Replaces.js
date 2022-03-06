/* ------------------ QUITAR NUMEROS -------------------------- */

replace(/1|2|3|4|5|6|7|8|9|0/gi, "").trim();


/* ----------------------- QUITAR LOS ESPACIADOS --------------------------- */

replace(/\s+/gi, ' ');


/* ---------------------- SACAR EL REQID DE LA URL -------------------------------- */

job.reqid = job.url.split('-').pop();


/* ------------------------ QUITAR LOS EMOJIS -----------------------------------*/

replace(/[\uD83C-\uDBFF\uDC00-\uDFFF]+/g, "");










