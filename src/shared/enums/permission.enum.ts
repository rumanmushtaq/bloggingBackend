export namespace App_Permissions {
  // Role module permission
  export const Role = {
    ADD: '6779a3236c8e177d1119eb51',
    EDIT: 'user_edit',
    READ: 'user_edit',
  } as const;

  // Staff module permission
  export const Staff = {
    ADD: 'user_add',
    EDIT: 'user_edit',
    RESET_PASSWORD: 'sacs',
  } as const;

  // User module permission
  export const User = {
    ADD: 'user_add',
    EDIT: 'user_edit',
  } as const;

  // Define a union type of all possible permissions
  export type AllPermissions =
    | (typeof Role)[keyof typeof Role]
    | (typeof Staff)[keyof typeof Staff]
    | (typeof User)[keyof typeof User];
}
