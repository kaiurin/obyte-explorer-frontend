import axios from "axios";
import { useGlobalStateStore } from "../stores/globalState";
import { storeToRefs } from "pinia";
import { EventNames } from "../enum/eventEnums";

export default async function fetchAddressInfo(socket, address, params) {
  const { wsConnected } = storeToRefs(useGlobalStateStore());

  let type = "info";
  if (params.lastInputsROWID) {
    type = "next_page";
  }

  if (wsConnected.value) {
    params.address = address;

    return new Promise((resolve) => {
      if (type === "next_page") {
        socket.emit(EventNames.LoadNextPageAddressTransactions, params, resolve);
        return;
      }
      socket.emit(EventNames.GetAddressData, params, resolve);
    });
  } else {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/address/${address}/${type}`, {
      params,
    });
    return data;
  }
}