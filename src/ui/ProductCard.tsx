import { MdOutlineStarOutline } from "react-icons/md";
import { ProductProps } from "../../type";
import AddToCartBtn from "./AddToCartBtn";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import FormattedPrice from "./FormattedPrice";
import { useNavigate } from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa";
import { store } from "../lib/store";
import toast from "react-hot-toast";
interface Props {
  item: ProductProps;
  setSearchText?: any;
}

const ProductCard = ({ item, setSearchText }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigate();

  const { addToFavorite, favoriteProduct } = store();
  const [existingProduct, setExistingProduct] = useState<ProductProps | null>(
    null
  );

  useEffect(() => {
    const availableItem = favoriteProduct.find(
      (x) => x?._id === item?._id
    );
    setExistingProduct(availableItem || null);
  }, [item, favoriteProduct]);

  const handleFavorite = () => {
    if (item) {
      addToFavorite(item).then(() => {
        toast.success(
          existingProduct
            ? `${item?.name.substring(0, 10)} removed successfully!`
            : `${item?.name.substring(0, 10)} added successfully!`
        );
      });
    }
  };

  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };
  const percentage =
    ((item?.regularPrice - item?.discountedPrice) / item?.regularPrice) * 100;

  const handleProduct = () => {
    navigation(`/product/${item?._id}`);
    setSearchText && setSearchText("");
  };
  return (
    <div className="border border-gray-100 rounded-lg p-1 overflow-hidden hover:border-gray-100 duration-200 cursor-pointer">
      <div className="w-full h-60 relative p-2 group">
        <span
          onClick={open}
          className="bg-gray-400 p-1 text-white absolute left-0 right-0 w-20 text-xs text-center py-1 rounded-md font-semibold inline-block z-10"
        >
          save {percentage.toFixed(0)}%
        </span>
        <span
            onClick={handleFavorite}
                className="w-11 h-11 inline-flex text-black text-lg items-center justify-center rounded-full absolute right-0 z-50 top-0"
              >
                {existingProduct ? <FaStar color="red"/> : <FaRegStar color="red" />}
              </span>
        <img
          onClick={handleProduct}
          src={item?.images[0]}
          alt="productImage"
          className="w-full h-full rounded-md object-cover group-hover:scale-110 duration-300"
        />
        {/* <ProductCardSideNav product={item} /> */}
      </div>
      <div className="flex flex-col gap-2 px-2 pb-2">
        <h3 className="text-xs uppercase font-semibold text-lightText">
          {item?.overView}
        </h3>
        <h2 className="text-lg font-bold line-clamp-2">{item?.name}</h2>
        <div className="text-base text-lightText flex items-center">
          <MdOutlineStarOutline />
          <MdOutlineStarOutline />
          <MdOutlineStarOutline />
          <MdOutlineStarOutline />
          <MdOutlineStarOutline />
        </div>
        <AddToCartBtn product={item} />
      </div>
      <Transition appear show={isOpen}>
        <Dialog
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={close}
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="w-full max-w-md rounded-xl bg-black backdrop-blur-2xl z-50 p-6">
                  <DialogTitle
                    as="h3"
                    className="text-base/7 font-medium text-whiteText"
                  >
                    Hurry up!
                  </DialogTitle>
                  <p className="mt-2 text-sm/6 text-white/50">
                    You are going to save{" "}
                    <span className="text-skyText">
                      <FormattedPrice
                        amount={item?.regularPrice - item?.discountedPrice}
                      />{" "}
                    </span>
                    from this product.
                  </p>
                  <p className="text-sm/6 text-white/50">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sequi, consequatur?
                  </p>
                  <div className="mt-4">
                    <Button
                      className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                      onClick={close}
                    >
                      Got it, thanks!
                    </Button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ProductCard;
