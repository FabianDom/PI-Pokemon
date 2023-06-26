export default function Validate(form, pokemons) {
  let errors = {};
  let regex = /^[a-zA-Z\s]*$/;
  const regexUrl = /^(ftp|http|https):\/\/[^ "]+$/;

  // Validar si hay nombre
  if (!form.name) {
    errors.name = "Enter a name";
  }
  // Validar que solo se le pasen al input caracteres especificos
  if (!regex.test(form.name)) {
    errors.name = "Invalid characters";
  }
  //Validamos que sea un nombre corto no tenga espacios
  if (form.name.length > 12 || form.name.includes(" ")) {
    errors.name =
      "The name must be up to 12 characters long and should not contain spaces";
  }
  // hacemos validaciones de las demas caracteristicas que necesita el pokemon
  if (!regexUrl.test(form.image)) {
    errors.image = "Invalid image URL";
  }

  if (form.hp < 1 || form.hp > 150) {
    if (form.hp < 1) {
      errors.hp = "The HP of the Pokemon must be higher than 1";
    } else if (form.hp > 150) {
      errors.hp = "The HP of the Pokemon must be less than 150";
    }
  }

  if (form.attack < 1 || form.attack > 200) {
    if (form.attack < 1) {
      errors.attack = "The attack of the Pokemon must be higher than 1";
    } else if (form.attack > 200) {
      errors.attack = "The attack of the Pokemon must be less than 200";
    }
  }

  if (form.defense < 1 || form.defense > 200) {
    if (form.defense < 1) {
      errors.defense = "The defense of the Pokemon must be higher than 1";
    } else if (form.defense > 200) {
      errors.defense = "The defense of the Pokemon must be less than 200";
    }
  }

  if (form.speed < 1 || form.speed > 100) {
    if (form.speed < 1) {
      errors.speed = "The speed of the Pokemon must be higher than 1";
    } else if (form.speed > 100) {
      errors.speed = "The speed of the Pokemon must be less than 100";
    }
  }

  if (form.height < 1 || form.height > 100) {
    if (form.height < 1) {
      errors.height = "The height of the Pokemon must be higher than 1";
    } else if (form.height > 100) {
      errors.height = "The height of the Pokemon must be less than 100";
    }
  }
  if (form.weight < 1 || form.weight > 1000) {
    if (form.weight < 1) {
      errors.weight = "The weight of the Pokemon must be higher than 1";
    } else if (form.weight > 1000) {
      errors.weight = "The weight of the Pokemon must be less than 1000";
    }
  }
  // Validar que tenga seleccione los tipos y que solo se puedan seleccionar 2 tipos al Pokemon.
  if (!form.types.length) {
    errors.types = "You must select a type of pokemon";
  } else if (form.types.length > 2) {
    errors.types = "You must select a maximum of two types of pokemon";
  }
  return errors;
}
