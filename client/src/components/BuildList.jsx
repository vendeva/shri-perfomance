import { BuildCard } from "./BuildCard";
import { Button } from "./Button";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFetchBuilds } from "../actions/builds";
import { getIsShowEnd } from "../reducers/interactive";
import constants from "../constants/constants";

export const BuildList = (params) => {
    const { data } = params;
    const dispatch = useDispatch();
    const isShowEnd = useSelector(getIsShowEnd);
    const handleShowMore = useCallback(
        () => dispatch(getFetchBuilds({ limit: constants.ADD_LIMIT, offset: data.length }, true)),
        [dispatch, data.length]
    );

    return (
        <>
            {data.map((item) => (
                <BuildCard link={`/build/${item.id}`} data={item} key={item.id} />
            ))}
            <Button
                text="Show more"
                view="cancel"
                click={handleShowMore}
                elementClass={`container__show ${isShowEnd ? "button_none" : ""}`}
            />
        </>
    );
};

export default BuildList;
