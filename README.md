# Proyecto: Plataforma de Prestación de Servicios

## Integrantes del Equipo
1. Chiara Del Popolo - 49941
2. Valentin Molina - 47172
3. Ignacio Boffi - 47059

---

## Descripción del Proyecto
Plataforma web para la contratación y gestión de servicios de prestadores como plomeros, electricistas, etc.  
El sistema permite registrar usuarios, proveedores y gestionar servicios a través de una interfaz simple y eficiente.

---

## **Alcance Mínimo**

### **Requisitos y Detalles**

| **Req**               | **Detalle**                          |
|------------------------|--------------------------------------|
| **CRUD simple**        | 1. ABM usuario                      |
|                        | 2. ABM prestador                    |
|                        | 3. ABM solicitudes de servicio      |
| **CRUD dependiente**   | 1. ABM presupuestos                 |
|                        | 2. ABM citas                        |
| **Listado + detalle**  | 1. Listado de prestadores           |
|                        | 2. Listado de solicitudes de servicio|
| **CUU / Epic**         | 1. Registrar Usuario                |
|                        | 2. Pedir presupuesto y agendar cita |

---

## **Adicionales**

### **Requisitos y Detalles**

| **Req**               | **Detalle**                          |
|------------------------|--------------------------------------|
| **CRUD**              | 1. Categorías de servicios           |
|                       | 2. Reseñas de prestadores            |
|                       | 3. Localidad                         |
|                       | 4. Notificaciones                    |
|                       | 5. Método de pago                    |
|                       | 6. Historial de servicios            |
|                       | 7. Gestión de presupuesto            |
| **CUU / Epic**        | 1. Ver historial de servicios        |
|                       | 2. Calificar prestador de servicio   |
|                       | 3. Gestión de presupuesto            |



## Scripts

- `npm start`: Inicia el servidor.
- `npm run dev`: Inicia el servidor con nodemon para desarrollo.
