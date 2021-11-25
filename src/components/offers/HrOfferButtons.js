import {withSwal} from "../commons/formsCommons/WithSwal";
import {offersAPI} from "../../utils/apis/OfferApi";

export const hrOfferButtons = (theme) => [
    {
        text: "Edit process",
        action: (offer, history) => history.push(`/hr/process/manage/${offer.id}`),
        style: {
            style: { background: theme.palette.secondary.dark, color: theme.palette.background.main },
            variant: "contained"
        },
        menu: "Offer Menu"
    },
    {
        text: "Edit offer",
        action: (offer, history) => {
            history.push(`/hr/offers/edit/${offer.id}`)
        },
        menu: "Offer Menu"
    },
    {
        text: "Delete offer",
        action: (offer, history) => {
            withSwal({
                loadingTitle: "Deleting offer",
                promise: () => offersAPI.deleteOffer(offer.id),
                successSwalTitle: "Successfully deleted",
                successSwalText: "Offer has been deleted",
                confirmButtonText: "Ok",
                successFunction: () => history.push("/hr/offers"),
                errorSwalTitle: "Offer not deleted",
                errorSwalText: "We couldn't delete your offer",
                errorConfirmButtonText: "Ok"
            })
        },
        style: {
            style: { border: `1px solid ${theme.status.danger.main}`, color: theme.status.danger.main },
            variant: "outlined"
        },
        menu: "Offer Menu"
    },
    {
        text: "Applications",
        action: (offer, history) => history.push(`/hr/applications/${offer.id}`),
        style: {
            color: "primary",
            variant: "contained"
        },
        menu: "Applications Menu"
    }

]