package com.demo.project89.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class DataController {

    @GetMapping(value = "/api/pie-data")
    public List getPieData() {
        log.info("Getting pie data");
        Random random = new Random();
        List pieData = new ArrayList<>();
        List dataElement = new ArrayList();
        List lableElement = new ArrayList();
        for (int i = 0; i < 5; i++) {
            lableElement.add("Region_" + i);
            dataElement.add(random.ints(0, 10).findFirst().getAsInt());
        }
        pieData.add(lableElement);
        pieData.add(dataElement);
        return pieData;
    }

    @GetMapping(value = "/api/column-data")
    public List<Map<String, Object>> getColumnData() {
        log.info("Getting column data");
        List<Map<String, Object>> columnData = new ArrayList<>();
        Map<String, Object> headerElement = new HashMap<>();
        headerElement.put("data", new String[]{"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"});
        columnData.add(headerElement);

        Map<String, Object> dataElement1 = new HashMap<>();
        dataElement1.put("name", "Bananas");
        dataElement1.put("data", new Integer[]{4, 5, 6, 2, 5, 7, 2, 1, 6, 7, 3, 4});
        columnData.add(dataElement1);

        Map<String, Object> dataElement2 = new HashMap<>();
        dataElement2.put("name", "Oranges");
        dataElement2.put("data", new Integer[]{7, 8, 9, 6, 7, 10, 9, 7, 6, 9, 8, 4});
        columnData.add(dataElement2);

        Map<String, Object> dataElement3 = new HashMap<>();
        dataElement3.put("name", "Apples");
        dataElement3.put("data", new Integer[]{5, 2, 3, 6, 7, 1, 2, 6, 6, 4, 6, 3});
        columnData.add(dataElement3);

        return columnData;
    }
}
