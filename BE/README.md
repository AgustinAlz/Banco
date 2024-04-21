# Banco Chelo
El banco Chelo posee una aplicación que permite a los usuarios realizar depósitos, extracciones y consultar el saldo y transacciones de sus cuentas.
El usuario administrador puede:
- Crear, editar y eliminar usuarios.
- Crear, editar y elminar cuentas para los usuarios.
- Crear, editar y elminar depósitos y extracciones en las cuentas de los usuarios.
- Consultar los usuarios, cuentas y transacciones.

# Dependencias
Para inicializar se requiere instalar las dependencias con el comando "npm install" tanto en la carptea Banco\BE como en la carpeta Banco\FE

# Inicalización datos básicos
Para insertar en la base de datos lo parametros básicos como roles, tipos de cuenta y el usuario administrador se requiere correr las
migracciones con el comando "npm run migrate up" en la carpeta Banco\BE.
Se puede dar de baja con el comando "npm run migrate down".

# Iniciar aplicación
Para inicar el BE en la carpeta Banco\BE se corre npm run dev
Para inicar el FE en la carpeta Banco\FE se corre npm run dev
En la URL http://localhost:5173/ se accederá a la aplicación

# Incio Sesión
Se podrá iniciar sesión con el usuario administrador
Correo electrónico: superadmin@bancochelo.com
Constraseña: 123

Para realizar las pruebas con mayor comodidad, el amil del usuario adminsitrador es el valor por defecto del campo email del inicio de sesión.
Este se puede remover posterior a las pruebas

Se podrá iniciar sesión con el usuario cliente
Correo electrónico: ramiro.ruiz@gmail.com
Constraseña: 123



