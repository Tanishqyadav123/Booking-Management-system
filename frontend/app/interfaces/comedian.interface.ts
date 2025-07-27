export type comedianPropsType = {
  firstName: string;
  lastName: string;
  avatar?: string;
};

export type getComedianDropDownType = {
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string | null;
};

export type getComedianDropDownResponseType = {
  success: true;
  message: string;
  data: getComedianDropDownType[];
};
