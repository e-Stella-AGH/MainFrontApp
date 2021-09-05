import {withSwal} from "../commons/formsCommons/WithSwal";
import {offersAPI} from "../../utils/apis/OfferApi";

export const hrOfferButtons = (theme) => [
    {
        text: "Edit",
        action: (offer, history) => {
            history.push(`/hr/offers/edit/${offer.id}`)
        }
    },
    {
        text: "Delete",
        action: (offer, history) => {
            withSwal({
                loadingTitle: "Deleting offer",
                promise: () => offersAPI.deleteOffer(offer.id),
                successSwalTitle: "Successfully deleted",
                successSwalText: "Offer has been deleted",
                confirmButtonText: "Ok",
                successFunction: () => history.go(0),
                errorSwalTitle: "Offer not deleted",
                errorSwalText: "We couldn't delete your offer",
                errorConfirmButtonText: "Ok"
            })
        },
        style: {
            style: { backgroundColor: theme.status.danger.main, color: '#ffffff' },
            variant: "contained"
        }
    },
    {
        text: "Edit process",
        action: (offer, history) => history.push(`/hr/process/manage/${offer.id}`),
        style: {
            color: "primary",
            variant: "contained"
        }
    },
    {
        text: "Applications",
        action: (offer, history) => history.push(`/hr/applications/${offer.id}`),
        style: {
            color: "primary",
            variant: "contained"
        }
    }

]