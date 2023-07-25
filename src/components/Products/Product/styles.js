import { makeStyles } from "@material-ui/core/styles";


export default makeStyles(() => ({
    root: {
        maxWidth: "100%"
    },
    media: {
      height: 600,
    },
    cardContent: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    cardActions: {
      display:"flex",
      justifyContent: 'flex-end',
      marginTop:"-80px"
    },
    buttons: {
      display: 'flex',
      alignItems: 'center',
    },
  }));