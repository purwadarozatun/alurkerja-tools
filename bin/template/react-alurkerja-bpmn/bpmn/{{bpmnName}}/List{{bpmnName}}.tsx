import React, { useState } from "react";
import { TableLowcode } from "alurkerja-ui";
import { useNavigate } from "react-router-dom";
import config from "@/utils/config";
import { dumasMenus } from "@/routes";

export const List{{bpmnName}}: React.FC = () => {
  const navigate = useNavigate();
  const baseUrl = config.API_URL;

  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 });
  const [renderState, setRenderState] = useState(0);
  const [filterBy, setFilterBy] = useState<{ [x: string]: any }>();
  const [search, setSearch] = useState<string>();

  return (
    <>
      <div>
        <TableLowcode
          baseUrl={baseUrl}
          specPath="{{specPath}}"
          title={ {{bpmnName}} }
          renderState={renderState}
          setRenderState={setRenderState}
          layout="auto"
          pageConfig={pageConfig}
          setPageConfig={setPageConfig}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          search={search}
          setSearch={setSearch}
          onClickCreate={() => navigate("/kpm146/create")}
        />
      </div>
    </>
  );
};
