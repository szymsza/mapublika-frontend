import { Dialog, Transition } from '@headlessui/react';
import { Button } from '@vechaiui/button';
import { cx } from '@vechaiui/utils';
import React from 'react';
import InfoIcon from '../../assets/icons/info.svg';

const Info = () => {
  const [showDialog, setShowDialog] = React.useState(false);
  const completeButtonRef = React.useRef(null);

  const handleOpen = () => setShowDialog(true);
  const handleClose = () => setShowDialog(false);

  return (
    <div className="flex">
      <div onClick={handleOpen} className="inline-flex hover:opacity-75">
          <img src={InfoIcon} alt="Info" width="35px" className="" />
      </div>
      
      <Transition show={showDialog} as={React.Fragment}>
      <Dialog
        initialFocus={completeButtonRef}
        as="div"
        className="fixed inset-0 overflow-y-auto z-modal"
        open={showDialog}
        onClose={handleClose}
      >
        <Dialog.Overlay className="fixed top-0 left-0 w-screen h-screen bg-blackAlpha-600" />
        <Transition.Child
          as={React.Fragment}
          enter="transition ease-out duration-150"
          enterFrom="transform scale-95"
          enterTo="transform scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="transform scale-100"
          leaveTo="transform scale-95"
        >
          <div
            className={cx(
              "relative flex flex-col w-full mx-auto my-24 rounded shadow-lg",
              "bg-white border border-gray-200",
              "dark:bg-neutral-800 dark:border-neutral-700",
              "max-w-md"
            )}
          >
            <header
              className="relative px-6 py-5 text-lg font-semibold"
            >
              O Mapublice
            </header>
            <button
              onClick={handleClose}
              className={cx(
                "absolute text-sm cursor-base text-gray-600 dark:text-gray-400 hover:text-primary-500 top-4 right-4"
              )}
            >
            </button>
            <div className="flex-1 px-6 py-2">
              <p className="text-base font-normal text-neutral-500">
                Mapublika vznikla v r??mci hackathonu NK?? <a href="https://www.hackujstat.cz/">hackujstat.cz</a>.
                C??lem bylo dostat data (prim??rn?? od ??S??, ale nejen ta) do vizu??ln??ch map ??esk?? republiky, 
                kter?? lze snadno porovn??vat a hledat korelace. P??edp??ipravili jsme n??kter?? datov?? sady, ale hlavn?? s??la 
                spo????v?? v mo??nosti nahr??vat vlastn?? data.
              </p>
              <br />
              <p className="text-base font-normal text-neutral-500">
                Z dat se tak?? automaticky tvo???? interaktivn?? z??bavn?? kv??z, kter?? hled?? zaj??mav?? ????sla a testuje Va??e odhady.
              </p>
              <br />
              <p className="text-base font-normal text-neutral-500">
                Projekt tak?? vyu????v?? slu??bu MojeID pro personalizaci pozdravu a kv??zu (lokalizace; jinak je t??eba zadat PS??) 
                a hlavn?? pro ukl??d??n?? dataset??. K d????ve nahran??m dataset??m se lze d??ky identifikaci ????tu v??dy vr??tit. 
              </p>
            </div>
            <footer className="px-6 py-4">
              <Button ref={completeButtonRef} variant="light" color="primary" onClick={handleClose}>
                Dob??e!
              </Button>
            </footer>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
    </div>
  );
}

export default Info;
