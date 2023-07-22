import csv
import urllib.request
# from PIL import Image
from bs4 import BeautifulSoup
import requests
# from requests_html import HTMLSession
# import pandas as pd
from io import BytesIO
import mysql.connector
import json
import time
# from selenium import webdriver
import os
from dotenv import load_dotenv
import asyncio
import aiohttp
from functools import partial

load_dotenv()

headers = ({'User-Agent':
                'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
            'Accept-Language': 'en-US, en;q=0.5'})
base_url = "https://mhrise.kiranico.com/"
fx_url = "https://monsterhunterrise.wiki.fextralife.com"
mydb = mysql.connector.connect(
    host=os.getenv('DEV_MYSQL_HOST'),
    user=os.getenv('DEV_MYSQL_USER'),
    password=os.getenv('DEV_MYSQL_PW'),
    database=os.getenv('DEV_MYSQL_DB')
)


# mydb = mysql.connector.connect(
#     host=os.getenv('DEV_MYSQL_HOST'),
#     user=os.getenv('DEV_MYSQL_USER'),
#     password=os.getenv('DEV_MYSQL_PW'),
#     database=os.getenv('DEV_MYSQL_DB')
# )


class Scraper(object):

    def __init__(self, headers, base_url, mydb):
        self.headers = headers
        self.base_url = base_url
        self.mydb = mydb

    class Monsters:
        def get_monsters(self):
            self.get_large_monster()
            self.get_small_monster()

        def get_large_monster(self):
            url = f"{base_url}data/monsters?view=lg"
            session = requests.Session()
            r = session.get(url, headers=headers)
            soup = BeautifulSoup(r.content, "html.parser")
            # print(soup)
            self.get_monster_pages(soup, monster_type="large")

        def get_small_monster(self):
            url = f"{base_url}data/monsters?view=sm"
            session = requests.Session()
            r = session.get(url, headers=headers)
            soup = BeautifulSoup(r.content, "html.parser")
            # print(soup)
            self.get_monster_pages(soup, monster_type="small")

        def get_monster_pages(self, soup, monster_type):
            all_monsters = soup.find_all("div", attrs={
                "class": "group relative p-4 border-r border-b border-gray-200 dark:border-gray-800 sm:p-6"})
            # print(all_monsters)
            for monster in all_monsters:
                # print(monster)
                monster_name = monster.find('a')
                monster_name = monster_name.text.strip()
                monster_img = monster.find('img')["src"]
                link = monster.find('a')['href']
                monster_id = link.split("monsters/")[1]
                print(monster_name)
                # print(link)
                # print(monster_img)
                print(monster_id)

                session = requests.Session()
                r = session.get(link, headers=headers)
                soup = BeautifulSoup(r.content, "html.parser")
                monster_description = soup.find("header", attrs={"class": "mb-9 space-y-1"}).find_all("p")[1].text
                mycursor = mydb.cursor()
                mycursor.execute("SELECT COUNT(*) from monsters WHERE monster_id = %s", [monster_id])
                exists = mycursor.fetchall()
                if exists[0][0] == 0:
                    # print("fefeg")
                    sql = "INSERT INTO monsters (name, link, image_link, monster_id, description, monster_size) VALUES (%s,%s,%s,%s,%s,%s)"
                    val = ([monster_name, link, monster_img, monster_id, monster_description, monster_type])
                    mycursor = mydb.cursor()
                    # print(mycursor)
                    mycursor.execute(sql, val)
                    # print(mycursor)
                    print(self.get_monster_details(soup, monster_id, monster_type, monster_name))

                else:
                    self.get_monster_details(soup, monster_id, monster_type, monster_name)
            mydb.commit()

        def get_monster_details(self, soup, monster_id, monster_type, monster_name):
            # hitzones = []
            # self.get_monster_physiology(soup, monster_id)
            self.get_monster_physiology(monster_name)
            # drops = []
            # self.get_monster_drops(soup, monster_id)

            # quests = []
            # self.get_monster_quests(soup, monster_id)

        # def get_monster_physiology(self, soup, monster_id):
        #     hitzones = []
        #     monster_hitzones = soup.find_all('table')[0]  # find monster phys table on page
        #     rows = monster_hitzones.find_all('tr')
        #     for row in rows:  # extract all important details from the table such as hitzone values for the different weapon types
        #         hitzone = row.find_all('td')[0].text
        #         hitzone_state = row.find_all('td')[1].text
        #         blade_hitzone_value = row.find_all('td')[2].text
        #         blunt_hitzone_value = row.find_all('td')[3].text
        #         gunner_hitzone_value = row.find_all('td')[4].text
        #         fire_hitzone_value = row.find_all('td')[5].text
        #         water_hitzone_value = row.find_all('td')[6].text
        #         ice_hitzone_value = row.find_all('td')[7].text
        #         thunder_hitzone_value = row.find_all('td')[8].text
        #         dragon_hitzone_value = row.find_all('td')[9].text
        #         stun_hitzone_value = row.find_all('td')[10].text
        #         hitzones.append({'hitzone': hitzone, 'state': hitzone_state, 'blade hitzone': blade_hitzone_value,
        #                          'blunt hitzone': blunt_hitzone_value,
        #                          'gunner hitzone': gunner_hitzone_value, 'fire hitzone': fire_hitzone_value,
        #                          'water hitzone': water_hitzone_value,
        #                          'ice hitzone': ice_hitzone_value, 'thunder hitzone': thunder_hitzone_value,
        #                          'dragon hitzone': dragon_hitzone_value,
        #                          'stun': stun_hitzone_value})
        #     hitzones = json.dumps(hitzones)
        #     mycursor = mydb.cursor()
        #     mycursor.execute("UPDATE monsters SET hitzones = %s WHERE monster_id = %s", [hitzones, monster_id])
        #     # return hitzones
        #     # return monster_hitzones
        def get_monster_physiology(self, monster_name):
            hitzones = []
            url = f"{fx_url}/"
            # words = monster_name.split(" ")
            url += "+".join(monster_name.split(" "))
            session = requests.Session()
            r = session.get(url, headers=headers)
            soup = BeautifulSoup(r.content, "html.parser")
            # monster_hitzones = soup.find_all('table')[0]  # find monster phys table on page
            # rows = monster_hitzones.find_all('tr')
            # for row in rows:  # extract all important details from the table such as hitzone values for the different weapon types
            #     hitzone = row.find_all('td')[0].text
            #     hitzone_state = row.find_all('td')[1].text
            #     blade_hitzone_value = row.find_all('td')[2].text
            #     blunt_hitzone_value = row.find_all('td')[3].text
            #     gunner_hitzone_value = row.find_all('td')[4].text
            #     fire_hitzone_value = row.find_all('td')[5].text
            #     water_hitzone_value = row.find_all('td')[6].text
            #     ice_hitzone_value = row.find_all('td')[7].text
            #     thunder_hitzone_value = row.find_all('td')[8].text
            #     dragon_hitzone_value = row.find_all('td')[9].text
            #     stun_hitzone_value = row.find_all('td')[10].text
            #     hitzones.append({'hitzone': hitzone, 'state': hitzone_state, 'blade hitzone': blade_hitzone_value,
            #                      'blunt hitzone': blunt_hitzone_value,
            #                      'gunner hitzone': gunner_hitzone_value, 'fire hitzone': fire_hitzone_value,
            #                      'water hitzone': water_hitzone_value,
            #                      'ice hitzone': ice_hitzone_value, 'thunder hitzone': thunder_hitzone_value,
            #                      'dragon hitzone': dragon_hitzone_value,
            #                      'stun': stun_hitzone_value})
            # hitzones = json.dumps(hitzones)
            # mycursor = mydb.cursor()
            # mycursor.execute("UPDATE monsters SET hitzones = %s WHERE monster_id = %s", [hitzones, monster_id])
            # return hitzones
            # return monster_hitzones

        def get_monster_drops(self, soup, monster_id):
            drops = []
            mycursor = mydb.cursor()
            monster_drop_table = soup.find_all('table')[5]  # find monster drop/carves table on page
            rows = monster_drop_table.find_all('tr')
            for row in rows:  # extract all useful information such as the item name, where it can be dropped from, percentage, etc
                item_name = row.find('a').text
                item_id = row.find('a')["href"].split("items/")[1]
                quest_rank = row.find_all("td")[1].text
                method = row.find_all("td")[2].text
                area = row.find_all("td")[3].text
                quantity = row.find_all("td")[4].text
                rate = row.find_all("td")[5].text
                monster_item = {"Item": item_name, "Item id": item_id, "Item Rank": quest_rank, "Drop Method": method,
                                "Drop Area": area,
                                "Quantity": quantity, "Drop Rate": rate}
                drops.append(monster_item)

                mycursor.execute("SELECT COUNT(*) from items WHERE item_id = %s", [item_id])
                exists = mycursor.fetchall()
                if exists[0][0] == 0:
                    sql = "INSERT INTO items (item_id) VALUES (%s)"
                    val = ([item_id])
                    # mycursor = mydb.cursor()
                    mycursor.execute(sql, val)
                    mycursor.execute("SELECT COUNT(*) from monster_items WHERE monster_id = %s and item_id = %s",
                                     [monster_id, item_id])
                    exists = mycursor.fetchall()
                    if exists[0][0] == 0:
                        sql = "INSERT INTO monster_items (monster_id, item_id) VALUES (%s,%s)"
                        val = ([monster_id, item_id])
                        # mycursor = mydb.cursor()
                        mycursor.execute(sql, val)
                        # print(mycursor)
                else:
                    mycursor.execute("SELECT COUNT(*) from monster_items WHERE monster_id = %s and item_id = %s",
                                     [monster_id, item_id])
                    exists = mycursor.fetchall()
                    if exists[0][0] == 0:
                        sql = "INSERT INTO monster_items (monster_id, item_id) VALUES (%s,%s)"
                        val = ([monster_id, item_id])
                        # mycursor = mydb.cursor()
                        mycursor.execute(sql, val)
                        # print(mycursor)

            drops = json.dumps(drops)

            mycursor.execute("UPDATE monsters SET drops = %s WHERE monster_id = %s", [drops, monster_id])

        def get_monster_quests(self, soup, monster_id):
            quests = []
            quest_table = soup.find_all("table")[4]
            rows = quest_table.find_all("tr")
            print(f"Num Quests = {len(rows)}")
            # count = 1
            for row in rows:
                quest_name = row.find("a").text
                quest_link = row.find('a')['href']
                quest_id = quest_link.split("quests/")[1]

                session = requests.Session()
                r = session.get(quest_link, headers=headers)
                soup = BeautifulSoup(r.content, "html.parser")
                quest_objective = \
                    soup.find_all("div", attrs={"class": "px-4 py-5 sm:p-6"})[0].text.split("Objective")[1].split("(")[
                        0].strip()
                # print(quest_objective)
                hunter_rank_points = \
                    soup.find_all("div", attrs={"class": "px-4 py-5 sm:p-6"})[0].text.split("Objective")[1].split(
                        "HRP:")[
                        1].split("pts")[0].strip()
                # print(hunter_rank_points)
                master_rank_points = \
                    soup.find_all("div", attrs={"class": "px-4 py-5 sm:p-6"})[0].text.split("Objective")[1].split(
                        "MRP:")[
                        1].split("pts")[0].strip()
                # print(master_rank_points)
                failure_conditions = \
                    soup.find_all("div", attrs={"class": "px-4 py-5 sm:p-6"})[1].text.split("Conditions")[
                        1].strip()
                # print(failure_conditions)

                # sizes_table = soup.find_all("div", attrs={"class": "basis-1/5"})
                sizes_table = soup.find(lambda tag: tag.name == "div" and
                                                    "basis-1/5" in tag.get("class", []) and
                                                    tag.find("a", href=lambda href: monster_id in href)).find("table")

                # print(sizes_table)
                mini_crown_chances = []
                king_crown_chances = []
                mini_crowns = sizes_table.select(f'tr:has(img[src*="crown_mini"])')
                # print(mini_crowns)
                for mini_crown in mini_crowns:
                    size = mini_crown.text.strip().split(" ")[0].replace("\n", "")
                    chance = mini_crown.text.strip().split(" ")[-1].replace("\n", "")
                    mini_crown_chances.append({size: chance})
                mini_crown_chances = json.dumps(mini_crown_chances)
                print(mini_crown_chances)
                king_crowns = sizes_table.select(f'tr:has(img[src*="crown_king"])')
                for king_crown in king_crowns:
                    size = king_crown.text.strip().split(" ")[0].replace("\n", "")
                    chance = king_crown.text.strip().split(" ")[-1].replace("\n", "")
                    king_crown_chances.append({size: chance})
                king_crown_chances = json.dumps(king_crown_chances)
                print(king_crown_chances)

                quest_rewards_table = soup.find(lambda tag: tag.name == "div" and
                                                            "basis-1/2" in tag.get("class", [])).find("table")
                # print(quest_rewards_table)

                rewards_rows = quest_rewards_table.find_all("tr")
                rewards = []
                for reward_row in rewards_rows:
                    # print(reward_row)
                    item_name = reward_row.find("a").text
                    print(item_name)
                    item_id = reward_row.find("a")["href"].split("items/")[1]
                    print(item_id)
                    quantity = reward_row.find_all("td")[2].text
                    print(quantity)
                    reward_chance = reward_row.find_all("td")[3].text
                    print(reward_chance)
                    rewards.append(
                        {"Item": item_name, "Item id": item_id, "Quantity": quantity, "Chance": reward_chance})

                rewards = json.dumps(rewards)
                print(rewards)
                quest_details = {"quest_name": quest_name, "quest_url": quest_link, "quest_id": quest_id,
                                 "objective": quest_objective,
                                 "HRP": hunter_rank_points, "MRP": master_rank_points,
                                 "failure conditions": failure_conditions}
                print(quest_details)
                # sql =
                # val = (quest_id,)
                self.save_monster_quests(monster_id, quest_id, quest_details, quest_name, quest_link, quest_objective,
                                         hunter_rank_points, master_rank_points,
                                         failure_conditions, mini_crown_chances, king_crown_chances, rewards)

            # return quests

        def save_monster_quests(self, monster_id, quest_id, quest_details, quest_name, quest_link, quest_objective,
                                hunter_rank_points, master_rank_points,
                                failure_conditions, mini_crown_chances, king_crown_chances, rewards):
            mycursor = mydb.cursor(buffered=True)
            mycursor.execute("SELECT COUNT(*) from quests WHERE quest_id = %s", [quest_id])
            exists = mycursor.fetchall()
            # print(mycursor)
            # print(exists[0][0])
            # print(rewards)
            # print(quest_link)
            if exists[0][0] == 0:
                print("fefeg")
                # sql = "INSERT INTO quests (quest_id, quest_name, quest_url, objective, HRP, MRP, failure_conditions, mini_crown, king_crown, rewards) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
                # val = ([quest_id, quest_name, quest_link, quest_objective, hunter_rank_points, master_rank_points, failure_conditions,
                #         mini_crown_chances, king_crown_chances, rewards])
                sql = "INSERT INTO quests (quest_id, quest_name, quest_url, objective, HRP, MRP, failure_conditions, mini_crown, king_crown, rewards) VALUES (%s,%s,%s,%s,%s,%s,%s,%s, %s, %s)"
                val = ([quest_id, quest_name, quest_link, quest_objective, hunter_rank_points, master_rank_points,
                        failure_conditions, mini_crown_chances, king_crown_chances, rewards])
                # mycursor = mydb.cursor(buffered=True)
                mycursor.execute(sql, val)
                sql = "INSERT INTO quest_monsters (quest_id, monster_id) VALUES (%s,%s)"
                val = ([quest_id, monster_id])
                # mycursor = mydb.cursor()
                mycursor.execute(sql, val)
                # print(mycursor)
            else:
                # mycursor = mydb.cursor(buffered=True)

                mycursor.execute("SELECT COUNT(*) from quest_monsters WHERE quest_id = %s and monster_id = %s",
                                 [quest_id, monster_id])
                exists = mycursor.fetchall()
                if exists[0][0] == 0:
                    sql = "INSERT INTO quest_monsters (quest_id, monster_id) VALUES (%s,%s)"
                    val = ([quest_id, monster_id])
                    # mycursor = mydb.cursor()
                    mycursor.execute(sql, val)
                    # print(mycursor)

    class Weapons:
        def save_weapons(self, i, results):
            print(results)
            # weaponset = {
            #     "0": "gs",
            #     "1": "sns",
            #     "2": "dbs",
            #     "3": "ls",
            #     "4": "ham",
            #     "5": "hh",
            #     "6": "lance",
            #     "7": "gl",
            #     "8": "sa",
            #     "9": "cb",
            #     "10": "ig",
            #     "11": "bow",
            #     "12": "lbg",
            #     "13": "hbg",
            # }

            mycursor = mydb.cursor(buffered=True)

            if i == 5:
                sql = "INSERT INTO weapons (weapon_id, weapon_type_id, weapon_type_name, weapon_name, weapon_url, weapon_img_url, " \
                      "deco_slots, rampage_deco_slots, attack, additional_property, " \
                      "element, element_val, base_sharpness, max_sharpness, " \
                      "rarity, weapon_description, detailed_img_url," \
                      "rampage_augs, forging_mats, upgrade_mats, songs) VALUES (%s,%s," \
                      "%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s, %s, %s)"
                mycursor.executemany(sql, results)


            elif i == 7:
                sql = "INSERT INTO weapons (weapon_id, weapon_type_id, weapon_type_name,weapon_name, weapon_url, weapon_img_url, " \
                      "deco_slots, rampage_deco_slots, attack, additional_property, " \
                      "element, element_val, base_sharpness, max_sharpness, " \
                      "rarity, weapon_description, detailed_img_url," \
                      "rampage_augs, forging_mats, upgrade_mats, shelling_type) VALUES (%s,%s," \
                      "%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s, %s, %s)"
                mycursor.executemany(sql, results)

            elif i == 8 or i == 9:
                sql = "INSERT INTO weapons (weapon_id, weapon_type_id, weapon_type_name,weapon_name, weapon_url, weapon_img_url, " \
                      "deco_slots, rampage_deco_slots, attack, additional_property, " \
                      "element, element_val, base_sharpness, max_sharpness, " \
                      "rarity, weapon_description, detailed_img_url," \
                      "rampage_augs, forging_mats, upgrade_mats, phial_type) VALUES (%s,%s," \
                      "%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
                mycursor.executemany(sql, results)

            elif i == 10:
                sql = "INSERT INTO weapons (weapon_id, weapon_type_id, weapon_type_name,weapon_name, weapon_url, weapon_img_url, " \
                      "deco_slots, rampage_deco_slots, attack, additional_property, " \
                      "element, element_val, base_sharpness, max_sharpness, " \
                      "rarity, weapon_description, detailed_img_url," \
                      "rampage_augs, forging_mats, upgrade_mats, kinsect_lvl) VALUES (%s,%s," \
                      "%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s, %s, %s)"
                mycursor.executemany(sql, results)

            elif i == 11:
                sql = "INSERT INTO weapons (weapon_id, weapon_type_id, weapon_type_name,weapon_name, weapon_url, weapon_img_url, " \
                      "deco_slots, rampage_deco_slots, attack, additional_property, " \
                      "element, element_val, base_sharpness, max_sharpness, " \
                      "rarity, weapon_description, detailed_img_url," \
                      "rampage_augs, forging_mats, upgrade_mats, arc_shot_type, " \
                      "charge_shot_levels, coatings) VALUES (%s,%s," \
                      "%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s, %s,%s)"
                mycursor.executemany(sql, results)

            elif i == 12 or i == 13:
                sql = "INSERT INTO weapons(weapon_id, weapon_type_id, weapon_type_name,weapon_name, weapon_url, weapon_img_url, " \
                      "deco_slots, rampage_deco_slots, attack, additional_property, " \
                      "element, element_val, base_sharpness, max_sharpness, " \
                      "rarity, weapon_description, detailed_img_url," \
                      "rampage_augs, forging_mats, upgrade_mats, bowgun_stats, " \
                      "ammo) VALUES (%s,%s," \
                      "%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s, %s, %s)"
                mycursor.executemany(sql, results)

            else:
                sql = "INSERT INTO weapons (weapon_id, weapon_type_id, weapon_type_name,weapon_name, weapon_url, weapon_img_url, " \
                      "deco_slots, rampage_deco_slots, attack, additional_property, " \
                      "element, element_val, base_sharpness, max_sharpness, " \
                      "rarity, weapon_description, detailed_img_url," \
                      "rampage_augs, forging_mats, upgrade_mats) VALUES (%s,%s," \
                      "%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s, %s, %s)"
                mycursor.executemany(sql, results)
                print(mycursor)

            # mycursor.executemany

        def get_all_weapons(self):
            weapon_ids = list(range(0, 14))
            weaponset = {
                "0": "gs",
                "1": "sns",
                "2": "dbs",
                "3": "ls",
                "4": "ham",
                "5": "hh",
                "6": "lance",
                "7": "gl",
                "8": "sa",
                "9": "cb",
                "10": "ig",
                "11": "bow",
                "12": "lbg",
                "13": "hbg",
            }

            # url = f"{base_url}data/weapons?view={13}"
            # print(url)
            # session = requests.Session()
            # r = session.get(url, headers=headers)  # need to let page fully load
            # # session = HTMLSession()
            # # r = session.get(url)
            # # r.html.render(timeout=20)
            # soup = BeautifulSoup(r.content, "html.parser")
            # # print(soup)
            # print(self.get_all_weapon_details(soup, 13))
            all_results = ()
            for i in weapon_ids:
                url = f"{base_url}data/weapons?view={i}"
                print(url)
                session = requests.Session()
                r = session.get(url, headers=headers)
                soup = BeautifulSoup(r.content, "html.parser")
                # print(soup)
                results = self.get_all_weapon_details(soup, i, weaponset.get(str(i)))
                all_results += (results,)
                # print(results)
                self.save_weapons(i, results)
                mydb.commit()

            # need 2 tables 1 for forging materials and another for upgrade materials
            # all_results = json.dumps(all_results)
            # print(all_results)
            # for item in all_results:
            #     print(item)
            #     for i in item:
            #         print(i)

            ids = [[i[0] for i in item] for item in all_results]
            # # print(results[10])
            # print(ids)
            forging_item_ids = []
            upgrade_item_ids = []
            forging_list = []
            upgrade_list = []
            for item in all_results:

                for i in item:
                    list3 = []
                    list4 = []
                    print(i[0])
                    print(json.loads(i[18]))
                    if json.loads(i[18]) != []:
                        for j in json.loads(i[18]):
                            forging_item_ids.append(j.get("Item ID"))
                            list3.append(j.get("Item ID"))
                    # elif json.loads(i[18]) == []:
                    #     print("empty1")
                    #     forging_item_ids.append("")
                    if json.loads(i[19]) != []:
                        for j in json.loads(i[19]):
                            print(j.get("Item ID"))
                            print("brger")
                            upgrade_item_ids.append(j.get("Item ID"))
                            list4.append(j.get("Item ID"))
                    # elif json.loads(i[19]) == []:
                    #     upgrade_item_ids.append("")
                    res1 = {i[0]: list3}
                    res2 = {i[0]: list4}
                    forging_list.append(res1)
                    upgrade_list.append(res2)
            # print(forging_list)
            # print(upgrade_list)
            rows = []
            for dictionary in forging_list:
                for weapon_id, item_ids in dictionary.items():
                    for item_id in item_ids:
                        rows.append((weapon_id, item_id))
            print(rows)
            for row in rows:
                mycursor = mydb.cursor()
                mycursor.execute("SELECT COUNT(*) FROM weapon_forging_items WHERE weapon_id = %s AND item_id = %s",
                                 [row[0], row[1]])
                exists = mycursor.fetchall()[0][0]
                if exists == 0:
                    sql = "INSERT INTO weapon_forging_items (weapon_id, item_id) VALUES (%s, %s)"
                    mycursor.execute(sql, row)
            # sql = "INSERT INTO weapon_forging_items (weapon_id, item_id) VALUES (%s, %s)"
            #
            # mycursor.executemany(sql, rows)
            rows = []
            print("-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*")
            print(rows)
            for dictionary in upgrade_list:
                for weapon_id, item_ids in dictionary.items():
                    for item_id in item_ids:
                        rows.append((weapon_id, item_id))
            for row in rows:
                mycursor = mydb.cursor()
                mycursor.execute("SELECT COUNT(*) FROM weapon_upgrade_items WHERE weapon_id = %s AND item_id = %s",
                                 [row[0], row[1]])
                exists = mycursor.fetchall()[0][0]
                if exists == 0:
                    sql = "INSERT INTO weapon_upgrade_items (weapon_id, item_id) VALUES (%s, %s)"
                    mycursor.execute(sql, row)
            # sql = "INSERT INTO weapon_upgrade_items (weapon_id, item_id) VALUES (%s, %s)"
            # mycursor.executemany(sql, rows)
            mydb.commit()

        def get_all_weapon_details(self, soup, wpn_id, wpn_type):
            weapons = []
            find_weapons = soup.select(
                "tbody.divide-y > tr")  # used css selector here since html was breaking lbg and hbg
            # print(find_weapons)

            # table_body = table.find('tbody')
            # rows = table_body.find_all('tr')

            elementset = {
                "1": "Fire",
                "2": "Water",
                "3": "Thunder",
                "4": "Ice",
                "5": "Dragon",
                "6": "Poison",
                "7": "Sleep",
                "8": "Paralysis",
                "9": "Blast"
            }

            for weapon in find_weapons:
                print(len(find_weapons))
                weapon_img = weapon.find_all("td")[0].find_all("img")[0]["src"]
                # print(weapon_img)
                weapon_name = weapon.find_all("td")[1].find("a").text
                weapon_url = weapon.find_all("td")[1].find("a")["href"]
                weapon_id = weapon_url.split("weapons/")[1]
                print(weapon_img)

                print(weapon_name)

                print(weapon_url)

                print(weapon_id)

                find_deco_slots = weapon.find_all("td")[2].find_all("div")[0].find_all("img")
                deco_slots = []
                for deco in find_deco_slots:
                    # print(deco)
                    deco_slots.append(deco["src"].split("ui/")[1].split(".")[0])

                deco_slots = json.dumps(deco_slots)
                print(deco_slots)
                find_rampage_slots = weapon.find_all("td")[2].find_all("div")[1].find_all("img")
                # print(find_rampage_slots)
                rampage_slots = []

                for rampage in find_rampage_slots:
                    rampage_slots.append(rampage["src"].split("ui/")[1].split(".")[0])

                rampage_slots = json.dumps(rampage_slots)
                print(rampage_slots)

                attack_val = weapon.find_all("td")[3].text
                print(attack_val)

                additional_property = weapon.find_all("td")[4].find("div")
                # print(additional_property.text.strip())
                if additional_property is not None and "Defense" in additional_property.text.strip():
                    additional_property = additional_property.text.strip()
                    # print(defense_bonus.text.strip())
                    # defense_bonus = additional_property.text

                elif additional_property is not None and "Affinity" in additional_property.text.strip():
                    additional_property = additional_property.text.strip()

                print(additional_property)

                weapon_element = ""
                element_val = 0  # need to find multiple for weapons with more than one element
                if weapon.find_all("td")[4].find_all("img") != []:
                    find_element = weapon.find_all("td")[4].find_all("img")
                    ele_count = 0
                    for element in find_element:
                        weapon_element = elementset.get(element["src"].split("Type")[1].split(".png")[0])
                        print(weapon_element)
                        element_val = weapon.find_all("span", attrs={"data-key": "elementAttack"})[ele_count].text
                        ele_count += 1
                        print(element_val)
                    # print("khk")
                # print(element, element_val)

                sharpness = []
                handicraft_sharpness = []
                try:
                    find_base_sharpness = weapon.find_all("td")[5].find_all("svg")[0].find_all("rect")
                    # print(find_base_sharpness)

                    for bar in find_base_sharpness:
                        # print(bar["width"])
                        sharpness.append(bar["width"])
                    print(sharpness)

                    find_max_handicraft_sharpness = weapon.find_all("td")[5].find_all("svg")[1].find_all("rect")
                    for bar in find_max_handicraft_sharpness:
                        # print(bar["width"])
                        handicraft_sharpness.append(bar["width"])
                    print(handicraft_sharpness)
                except IndexError:
                    sharpness = []
                    handicraft_sharpness = []

                sharpness = json.dumps(sharpness)
                handicraft_sharpness = json.dumps(handicraft_sharpness)

                rarity = weapon.find_all("td")[-1].find("small").text.strip()
                print(rarity)
                weapon_description, detailed_weapon_img_url, rampage_augments, forging_materials, upgrade_materials = (
                    self.get_weapon_page_details(weapon_url))
                print(weapon_description)
                print(upgrade_materials)
                rampage_augments = json.dumps(rampage_augments)
                forging_materials = json.dumps(forging_materials)
                upgrade_materials = json.dumps(upgrade_materials)
                print(forging_materials)
                print(upgrade_materials)

                if wpn_id == 5:  # hunting horn section
                    print("ok")

                    songs = weapon.find_all('div', attrs={"class": "columns-3"})
                    songs = [ele.text.strip().split("\n") for ele in songs][0]
                    # print(songs)
                    songs = json.dumps(songs)
                    # print(songs)
                    # print("efe")
                    # print((weapon_id, weapon_name, weapon_url, weapon_img, deco_slots, rampage_slots, attack_val, \
                    #        additional_property, weapon_element, element_val, sharpness, handicraft_sharpness,
                    #        rarity, weapon_description, \
                    #        detailed_weapon_img_url, rampage_augments, forging_materials, upgrade_materials, "songs"+songs))
                    weapons.append((weapon_id, wpn_id, wpn_type, weapon_name, weapon_url, weapon_img, deco_slots,
                                    rampage_slots, attack_val, \
                                    additional_property, weapon_element, element_val, sharpness, handicraft_sharpness,
                                    rarity, weapon_description, \
                                    detailed_weapon_img_url, rampage_augments, forging_materials, upgrade_materials,
                                    songs))
                    # print(weapons)

                elif wpn_id == 7:  # gunlance section
                    shelling_type = weapon.find('div', attrs={"class": "columns-3"}).text.strip()
                    print(shelling_type)
                    weapons.append((weapon_id, wpn_id, wpn_type, weapon_name, weapon_url, weapon_img, deco_slots,
                                    rampage_slots, attack_val, \
                                    additional_property, weapon_element, element_val, sharpness, handicraft_sharpness,
                                    rarity, weapon_description, \
                                    detailed_weapon_img_url, rampage_augments, forging_materials, upgrade_materials,
                                    shelling_type))

                elif wpn_id == 8 or wpn_id == 9:  # switch axe and charge blade section
                    phial_type = weapon.find('div', attrs={"class": "columns-3"}).text.strip()
                    print(phial_type)
                    weapons.append((weapon_id, wpn_id, wpn_type, weapon_name, weapon_url, weapon_img, deco_slots,
                                    rampage_slots, attack_val, \
                                    additional_property, weapon_element, element_val, sharpness, handicraft_sharpness,
                                    rarity, weapon_description, \
                                    detailed_weapon_img_url, rampage_augments, forging_materials, upgrade_materials,
                                    phial_type))

                elif wpn_id == 10:
                    kinsect_level = weapon.find('div', attrs={"class": "columns-3"}).text.strip()
                    print(kinsect_level)
                    weapons.append((weapon_id, wpn_id, wpn_type, weapon_name, weapon_url, weapon_img, deco_slots,
                                    rampage_slots, attack_val, \
                                    additional_property, weapon_element, element_val, sharpness, handicraft_sharpness,
                                    rarity, weapon_description, \
                                    detailed_weapon_img_url, rampage_augments, forging_materials, upgrade_materials,
                                    kinsect_level))

                elif wpn_id == 11:
                    arc_shot_type = weapon.find_all("td")[5].find_all("div")[0].text.strip()
                    charge_shot_levels = weapon.find_all("td")[5].find_all("div", attrs={"class": None})
                    # print(charge_shot_levels)
                    levels = []
                    # for level in charge_shot_levels:
                    #     if "class" in level:
                    #         print(level)
                    charge_shot_levels = [ele.text.strip() for ele in charge_shot_levels]
                    coatings = weapon.find_all("td")[6].find_all("div", attrs={"class": ""})
                    coatings = [ele.text.strip() for ele in coatings]
                    charge_shot_levels = json.dumps(charge_shot_levels)
                    coatings = json.dumps(coatings)
                    # print(arc_shot_type)
                    # print(charge_shot_levels)
                    # print(coatings)
                    weapons.append((weapon_id, wpn_id, wpn_type, weapon_name, weapon_url, weapon_img, deco_slots,
                                    rampage_slots, attack_val, \
                                    additional_property, weapon_element, element_val, sharpness, handicraft_sharpness,
                                    rarity, weapon_description, \
                                    detailed_weapon_img_url, rampage_augments, forging_materials, upgrade_materials,
                                    arc_shot_type, charge_shot_levels, \
                                    coatings))

                elif wpn_id == 12 or wpn_id == 13:  # need to ignore elements here
                    bowgun_stats = weapon.find_all("td")[5].find_all("div")
                    bowgun_stats = [ele.text.strip() for ele in bowgun_stats]
                    print(bowgun_stats)
                    bowgun_stats = [{item.split('\n')[0].strip(): item.split('\n')[1].strip()} for item in bowgun_stats]
                    # print(bowgun_stats)
                    ammo_details = weapon.find_all("td")[5].find_all("td")[1:]
                    # print(ammo_details)
                    find_ammo_details = [ele.text for ele in ammo_details if ele.find("td") is None]
                    # ammo_details = [[inner.text for inner in ele] for ele in ammo_details]
                    # print(find_ammo_details)
                    ammo_details = []
                    current_dict = {}
                    for item in find_ammo_details:
                        if item.isnumeric():
                            current_dict.setdefault(key, []).append(int(item))
                        else:
                            if current_dict:
                                ammo_details.append(current_dict)
                                current_dict = {}
                            key = item

                    if current_dict:
                        ammo_details.append(current_dict)

                    print(bowgun_stats)
                    bowgun_stats = json.dumps(bowgun_stats)
                    ammo_details = json.dumps(ammo_details)
                    # print(ammo_details)
                    weapons.append((weapon_id, wpn_id, wpn_type, weapon_name, weapon_url, weapon_img, deco_slots,
                                    rampage_slots, attack_val, \
                                    additional_property, weapon_element, element_val, sharpness, handicraft_sharpness,
                                    rarity, weapon_description, \
                                    detailed_weapon_img_url, rampage_augments, forging_materials, upgrade_materials,
                                    bowgun_stats, ammo_details))


                else:
                    weapons.append((weapon_id, wpn_id, wpn_type, weapon_name, weapon_url, weapon_img, deco_slots,
                                    rampage_slots, attack_val, \
                                    additional_property, weapon_element, element_val, sharpness, handicraft_sharpness,
                                    rarity,
                                    weapon_description, \
                                    detailed_weapon_img_url, rampage_augments, forging_materials, upgrade_materials))
                print("-------------------------------------------------------------")

            #     print(len(weapons))
            # print([len(item) for item in weapons])
            return weapons

        def get_weapon_page_details(self, weapon_url):
            session = requests.Session()
            r = session.get(weapon_url, headers=headers)
            soup = BeautifulSoup(r.content, "html.parser")
            weapon_description = soup.find("header", attrs={"class": "mb-9 space-y-1"}).find_all("p")[-1].text
            # print(weapon_description)
            try:
                detailed_weapon_img_url = soup.find("a", attrs={"target": "_blank"})["href"]
                # print(detailed_weapon_img_url)
            except TypeError:
                detailed_weapon_img_url = None
            find_rampage_augments = soup.find_all("tbody")[0].find_all("td")[-1].find_all("a")
            # print(find_rampage_augments)
            rampage_augments = []
            for augment in find_rampage_augments:
                rampage_augments.append(augment.text.strip())
            # print(rampage_augments)

            find_forging_materials = soup.find_all("div", attrs={"class": "basis-1/2"})[0].find_all("tr")
            forging_materials = []

            for material in find_forging_materials:
                item_id = material.find_all("td")[0].find("a")["href"].split("items/")[1]
                # print(item_id)
                item_name = material.find_all("td")[0].find("a").text
                quantity = material.find_all("td")[1].text.strip()
                # print(quantity)
                forging_materials.append({"Item ID": item_id, "Item Name": item_name, "Quantity": quantity})
            # print(forging_materials)

            find_upgrade_materials = soup.find_all("div", attrs={"class": "basis-1/2"})[1].find_all("tr")
            upgrade_materials = []

            for material in find_upgrade_materials:
                item_id = material.find_all("td")[0].find("a")["href"].split("items/")[1]
                # print(item_id)
                item_name = material.find_all("td")[0].find("a").text
                quantity = material.find_all("td")[1].text.strip()
                # print(quantity)
                upgrade_materials.append({"Item ID": item_id, "Item Name": item_name, "Quantity": quantity})
            # print(upgrade_materials)

            return weapon_description, detailed_weapon_img_url, rampage_augments, forging_materials, upgrade_materials

    class Items:
        def get_all_items(self):
            consumables = self.get_consumables()
            materials = self.get_materials()
            scraps = self.get_scraps()
            ammos = self.get_ammo()
            account_items = self.get_account_items()
            room_items = self.get_room_items()
            # print(consumables)
            # print(materials)
            # print(scraps)
            # print(ammos)
            # print(account_items)
            # print(room_items)
            items = consumables + materials + scraps + ammos + room_items + account_items
            print(items)
            mycursor = mydb.cursor()
            for item in items:
                mycursor.execute("SELECT COUNT(*) FROM items WHERE item_id = %s", [item[0]])
                exists = mycursor.fetchall()[0][0]
                print(exists)
                if exists == 0:
                    sql = "INSERT INTO items (item_id, item_name,item_url,item_img,item_description) VALUES (%s, %s, %s, %s, %s)"
                    mycursor.execute(sql, item)
                else:
                    sql = "UPDATE items SET item_name = %s, item_url = %s, item_img = %s, item_description = %s WHERE item_id = %s"
                    mycursor.execute(sql, [item[1], item[2], item[3], item[4], item[0]])
            mydb.commit()
            # sql = "INSERT INTO items (item_id, item_name,item_url,item_img,item_description) VALUES (%s, %s, %s, %s, %s)"
            # mycursor.executemany(sql, items)

        def get_consumables(self):
            consumables_url = f"{base_url}data/items?view=consume"
            session = requests.Session()
            r = session.get(consumables_url, headers=headers)
            soup = BeautifulSoup(r.content, "html.parser")
            # print(soup)
            all_consumables = soup.find_all("div", attrs={
                "class": "flex items-center border-r border-b border-gray-200 dark:border-gray-800 p-2 sm:p-1"})

            consumables = []
            for consumable in all_consumables:
                item_name = consumable.find("p", attrs={
                    "class": "text-sm font-medium text-sky-500 dark:text-sky-400 group-hover:text-sky-900 dark:group-hover:text-sky-300"}).text
                item_img = consumable.find('img')["src"]
                item_url = consumable.find('a')['href']
                item_id = item_url.split("items/")[1]
                session = requests.Session()
                r = session.get(item_url, headers=headers)
                item_page = BeautifulSoup(r.content, "html.parser")
                item_description = item_page.find("header", attrs={"mb-9 space-y-1"}).find_all("p")[-1].text
                print(item_name)
                print(item_description)
                print(item_id)
                consumables.append((item_id, item_name, item_url, item_img, item_description))
            return consumables

        def get_materials(self):
            materials_url = f"{base_url}data/items?view=material"
            print(materials_url)
            session = requests.Session()
            r = session.get(materials_url, headers=headers)
            soup = BeautifulSoup(r.content, "html.parser")
            all_materials = soup.find_all("div", attrs={
                "class": "flex items-center border-r border-b border-gray-200 dark:border-gray-800 p-2 sm:p-1"})

            materials = []
            for material in all_materials:
                item_name = material.find("p", attrs={
                    "class": "text-sm font-medium text-sky-500 dark:text-sky-400 group-hover:text-sky-900 dark:group-hover:text-sky-300"}).text
                item_img = material.find('img')["src"]
                item_url = material.find('a')['href']
                item_id = item_url.split("items/")[1]
                session = requests.Session()
                r = session.get(item_url, headers=headers)
                item_page = BeautifulSoup(r.content, "html.parser")
                item_description = item_page.find("header", attrs={"mb-9 space-y-1"}).find_all("p")[-1].text
                print(item_name)
                print(item_description)
                print(item_id)
                materials.append((item_id, item_name, item_url, item_img, item_description))
            return materials
            # print(item_page.find("div", attrs={"basis-1/2"}))
            # if item_page.find("div", attrs={"basis-1/2"}) is not None:
            #     for section in item_page.find_all("div", attrs={"basis-1/2"}):
            #         if section.find("h2").text.strip() == "Locale":
            #             print("rrhehr")
            #             rows = section.find_all("tr")
            #             for row in rows:
            #                 map = row.find_all("td")[0].text.strip()
            #                 quest_level = row.find_all("td")[1].text.strip()
            #                 quantity = row.find_all("td")[2].text.strip()
            #                 chance = row.find_all("td")[3].text.strip()
            #
            #                 print(map, quest_level, quantity, chance)

        def get_scraps(self):
            scraps_url = f"{base_url}data/items?view=scrap"
            print(scraps_url)
            session = requests.Session()
            r = session.get(scraps_url, headers=headers)
            soup = BeautifulSoup(r.content, "html.parser")
            all_scraps = soup.find_all("div", attrs={
                "class": "flex items-center border-r border-b border-gray-200 dark:border-gray-800 p-2 sm:p-1"})

            scraps = []
            for scrap in all_scraps:
                item_name = scrap.find("p", attrs={
                    "class": "text-sm font-medium text-sky-500 dark:text-sky-400 group-hover:text-sky-900 dark:group-hover:text-sky-300"}).text
                item_img = scrap.find('img')["src"]
                item_url = scrap.find('a')['href']
                item_id = item_url.split("items/")[1]
                session = requests.Session()
                r = session.get(item_url, headers=headers)
                item_page = BeautifulSoup(r.content, "html.parser")
                item_description = item_page.find("header", attrs={"mb-9 space-y-1"}).find_all("p")[-1].text
                print(item_name)
                print(item_description)
                print(item_id)
                scraps.append((item_id, item_name, item_url, item_img, item_description))
            return scraps

        def get_ammo(self):
            ammo_url = f"{base_url}data/items?view=ammo"
            print(ammo_url)
            session = requests.Session()
            r = session.get(ammo_url, headers=headers)
            soup = BeautifulSoup(r.content, "html.parser")
            all_ammo = soup.find_all("div", attrs={
                "class": "flex items-center border-r border-b border-gray-200 dark:border-gray-800 p-2 sm:p-1"})

            ammos = []
            for ammo in all_ammo:
                item_name = ammo.find("p", attrs={
                    "class": "text-sm font-medium text-sky-500 dark:text-sky-400 group-hover:text-sky-900 dark:group-hover:text-sky-300"}).text
                item_img = ammo.find('img')["src"]
                item_url = ammo.find('a')['href']
                item_id = item_url.split("items/")[1]
                session = requests.Session()
                r = session.get(item_url, headers=headers)
                item_page = BeautifulSoup(r.content, "html.parser")
                item_description = item_page.find("header", attrs={"mb-9 space-y-1"}).find_all("p")[-1].text
                print(item_name)
                print(item_description)
                print(item_id)
                ammos.append((item_id, item_name, item_url, item_img, item_description))
            return ammos

        def get_account_items(self):
            account_item_url = f"{base_url}data/items?view=account"
            print(account_item_url)
            session = requests.Session()
            r = session.get(account_item_url, headers=headers)
            soup = BeautifulSoup(r.content, "html.parser")
            all_account_items = soup.find_all("div", attrs={
                "class": "flex items-center border-r border-b border-gray-200 dark:border-gray-800 p-2 sm:p-1"})
            account_items = []
            for item in all_account_items:
                item_name = item.find("p", attrs={
                    "class": "text-sm font-medium text-sky-500 dark:text-sky-400 group-hover:text-sky-900 dark:group-hover:text-sky-300"}).text
                item_img = item.find('img')["src"]
                item_url = item.find('a')['href']
                item_id = item_url.split("items/")[1]
                session = requests.Session()
                r = session.get(item_url, headers=headers)
                item_page = BeautifulSoup(r.content, "html.parser")
                item_description = item_page.find("header", attrs={"mb-9 space-y-1"}).find_all("p")[-1].text
                print(item_name)
                print(item_description)
                print(item_id)
                account_items.append((item_id, item_name, item_url, item_img, item_description))
            return account_items

        def get_room_items(self):
            room_items_url = f"{base_url}data/items?view=antique"
            print(room_items_url)
            session = requests.Session()
            r = session.get(room_items_url, headers=headers)
            soup = BeautifulSoup(r.content, "html.parser")
            all_room_items = soup.find_all("div", attrs={
                "class": "flex items-center border-r border-b border-gray-200 dark:border-gray-800 p-2 sm:p-1"})
            room_items = []
            for item in all_room_items:
                item_name = item.find("p", attrs={
                    "class": "text-sm font-medium text-sky-500 dark:text-sky-400 group-hover:text-sky-900 dark:group-hover:text-sky-300"}).text
                item_img = item.find('img')["src"]
                item_url = item.find('a')['href']
                item_id = item_url.split("items/")[1]
                session = requests.Session()
                r = session.get(item_url, headers=headers)
                item_page = BeautifulSoup(r.content, "html.parser")
                item_description = item_page.find("header", attrs={"mb-9 space-y-1"}).find_all("p")[-1].text
                print(item_name)
                print(item_description)
                print(item_id)
                room_items.append((item_id, item_name, item_url, item_img, item_description))
            return room_items

        def get_crafting_list(self):
            crafting_list_url = f"{base_url}data/item-mix"
            session = requests.Session()
            r = session.get(crafting_list_url, headers=headers)
            soup = BeautifulSoup(r.content, "html.parser")
            all_crafting = soup.find_all("tr")
            crafting_list = []
            for craft in all_crafting:
                craft_num = craft.find_all("td")[0].text
                # print(craft_num)
                auto_craft = False
                auto_craft_true = craft.find("path", attrs={"d": "M5 13l4 4L19 7"})
                auto_craft_false = craft.find("path", attrs={"d": "M6 18L18 6M6 6l12 12"})

                if auto_craft_true is not None and auto_craft_false is None:
                    auto_craft = True

                # elif auto_craft_true is None and auto_craft_false is not None:
                #     auto_craft = False

                # print(auto_craft)

                item_id = craft.find("img")["src"].split("items/")[1].split(".png")[0]
                # print(item_id)

                craft_quantity = craft.find_all("td")[3].text
                # print(craft_quantity)

                find_ingredients = craft.find_all("td")[4:6]
                ingredients = []

                for ingredient in find_ingredients:
                    if ingredient.find("img") is not None:
                        ingredient_id = ingredient.find("img")["src"].split("items/")[1].split(".png")[0]
                        ingredients.append(ingredient_id)
                ingredients = json.dumps(ingredients)
                # print(ingredients)
                crafting_list.append((craft_num, item_id, craft_quantity, ingredients, auto_craft))
            # return crafting_list
            mycursor = mydb.cursor(buffered=True)
            for craft in crafting_list:
                mycursor.execute("SELECT COUNT(*) FROM crafting_list WHERE craft_num = %s",
                                 [craft[0]])
                exists = mycursor.fetchall()[0][0]
                if exists == 0:
                    sql = "INSERT INTO crafting_list (craft_num, item_id, craft_quantity, ingredients, auto_craft) VALUES " \
                          "(%s, %s, %s, %s, %s)"

                    mycursor.execute(sql, craft)
            mydb.commit()

    class Skills:
        def get_skills(self):
            # skills = self.get_armour_skills()
            # print(skills)
            # self.get_armour_skills()
            # self.get_rampage_decorations()
            # rampage_skills = self.get_rampage_skills()
            # print(rampage_skills)
            # decorations = self.get_decorations()
            # print(decorations)
            # switch_skills = self.get_switch_skills()
            # print(switch_skills)
            # self.get_switch_skills()
            # dango_skills = self.get_dango_skills()
            # print(dango_skills)
            # canteen_dango = self.get_canteen_dango()
            # print(canteen_dango)
            # crafting_list = self.get_crafting_list()
            # print(crafting_list)
            # self.get_crafting_list()
            # self.get_dango_skills()
            # self.get_canteen_dango()
            #   self.get_decorations()
            #   self.get_rampage_decorations()
            self.get_rampage_skills()

        def get_armour_skills(self):
            armour_skills_url = f"{base_url}data/skills"
            session = requests.Session()
            r = session.get(armour_skills_url, headers=headers)
            soup = BeautifulSoup(r.content, "html.parser")
            all_skills = soup.find_all("tr")
            skills = []
            for skill in all_skills:
                # print(skill)
                skill_name = skill.find("p", attrs={
                    "text-sm font-medium text-sky-500 dark:text-sky-400 group-hover:text-sky-900 dark:group-hover:text-sky-300"}).text
                # print(skill_name)
                skill_url = skill.find('a')['href']
                # print(skill_url)
                skill_id = skill_url.split("skills/")[1]
                # print(skill_id)
                skill_description = skill.find("p", attrs={"truncate"}).text
                # print(skill_description)
                find_skill_levels = skill.find_all("small")
                skill_levels = []
                for level in find_skill_levels:
                    if level.text != "":
                        # print(level.text)
                        skill_levels.append(level.text)
                print(skill_levels)
                skill_levels = json.dumps(skill_levels)
                skills.append((skill_id, skill_name, skill_description, skill_levels))
            mycursor = mydb.cursor(buffered=True)

            for skill in skills:
                mycursor.execute("SELECT COUNT(*) FROM armour_skills WHERE skill_id = %s",
                                 [skill[0]])
                exists = mycursor.fetchall()[0][0]
                print(exists)
                if exists == 0:
                    sql = "INSERT INTO armour_skills (skill_id, skill_name, skill_description, skill_levels ) VALUES " \
                          "(%s, %s, %s, %s)"

                    mycursor.execute(sql, skill)
            mydb.commit()

            # forging_item_ids = []
            # forging_list = []
            # for item in armours:
            #     print(item)
            #     list3 = []
            #     if item[14] != []:
            #         for j in json.loads(item[14]):
            #             forging_item_ids.append(j.get("Item ID"))
            #             list3.append(j.get("Item ID"))
            #     res1 = {item[0]: list3}
            #     forging_list.append(res1)
            # rows = []
            # for dictionary in forging_list:
            #     for armour_id, item_ids in dictionary.items():
            #         for item_id in item_ids:
            #             rows.append((armour_id, item_id))
            # print(rows)
            # for row in rows:
            #     mycursor = mydb.cursor()
            #     mycursor.execute("SELECT COUNT(*) FROM armour_items WHERE armour_id = %s AND item_id = %s",
            #                      [row[0], row[1]])
            #     exists = mycursor.fetchall()[0][0]
            #     if exists == 0:
            #         sql = "INSERT INTO armour_items (armour_id, item_id) VALUES (%s, %s)"
            #         mycursor.execute(sql, row)
            # # sql = "INSERT INTO weapon_forging_items (weapon_id, item_id) VALUES (%s, %s)"
            # #
            # # mycursor.executemany(sql, rows)
            # mydb.commit()
            # return skills

            # for item in all_room_items:

        def get_rampage_skills(self):
            rampage_skills_url = f"{base_url}data/rampage-skills"
            session = requests.Session()
            r = session.get(rampage_skills_url, headers=headers)
            soup = BeautifulSoup(r.content, "html.parser")
            all_rampage_skills = soup.find_all("tr")
            rampage_skills = []
            for rampage_skill in all_rampage_skills:
                skill_name = rampage_skill.find("a").text
                print(skill_name)
                skill_url = rampage_skill.find('a')['href']
                print(skill_url)
                skill_id = skill_url.split("skills/")[1]
                print(skill_id)
                skill_description = rampage_skill.find_all("td")[-1].text
                print(skill_description)
                rampage_skills.append((skill_id, skill_name, skill_description))
            # return rampage_skills
            mycursor = mydb.cursor(buffered=True)
            for skill in rampage_skills:
                mycursor.execute("SELECT COUNT(*) FROM rampage_skills WHERE rampage_skill_id = %s",
                                 [skill[0]])
                exists = mycursor.fetchall()[0][0]
                if exists == 0:
                    sql = "INSERT INTO rampage_skills (rampage_skill_id, rampage_skill_name, rampage_skill_description) VALUES (%s, %s, %s)"

                    mycursor.execute(sql, skill)
            mydb.commit()

        def get_decorations(self):
            decorations_url = f"{base_url}data/decorations"
            session = requests.Session()
            r = session.get(decorations_url, headers=headers)
            soup = BeautifulSoup(r.content, "html.parser")
            all_decorations = soup.find_all("tr")
            decorations = []
            for decoration in all_decorations:
                decoration_name = decoration.find_all("a")[0].text
                print(decoration_name)
                skill_name = decoration.find_all("a")[1].text
                print(skill_name)
                decoration_url = decoration.find_all('a')[0]['href']
                print(decoration_url)
                skill_url = decoration.find_all('a')[1]['href']
                print(skill_url)
                decoration_id = decoration_url.split("decorations/")[1]
                print(decoration_id)
                skill_id = skill_url.split("skills/")[1]
                print(skill_id)
                skill_level = decoration.find_all("td")[1].find("div").contents[-1].strip()
                print(skill_level)
                skill_description = decoration.find_all("td")[-1].text
                print(skill_description)
                crafting_materials = []

                session = requests.Session()
                r = session.get(decoration_url, headers=headers)
                soup = BeautifulSoup(r.content, "html.parser")
                find_crafting_materials = soup.find_all("table")[-1].find_all("tr")

                for material in find_crafting_materials:
                    item_name = material.find("a").text
                    # print(item_name)
                    item_id = material.find("a")["href"].split("items/")[1]
                    quantity = material.find_all("td")[0].contents[-1].strip()
                    # print(item_name, item_id, quantity)
                    crafting_materials.append({"Item_id": item_id, "Item_name": item_name, "Quantity": quantity})
                print(crafting_materials)
                crafting_materials = json.dumps(crafting_materials)
                decorations.append(
                    (decoration_id, decoration_name, skill_id, skill_name, skill_description, skill_level,
                     crafting_materials))
            # return decorations
            mycursor = mydb.cursor(buffered=True)
            for decoration in decorations:
                mycursor.execute("SELECT COUNT(*) FROM skill_decorations WHERE decoration_id = %s",
                                 [decoration[0]])
                exists = mycursor.fetchall()[0][0]
                if exists == 0:
                    sql = "INSERT INTO skill_decorations (decoration_id, decoration_name, skill_id, skill_name, skill_description," \
                          " skill_level,crafting_materials) VALUES (%s, %s, %s, %s, %s, %s, %s)"

                    mycursor.execute(sql, decoration)
            mydb.commit()

        def get_rampage_decorations(self):
            decorations_url = f"{base_url}data/rampage-decorations"
            session = requests.Session()
            r = session.get(decorations_url, headers=headers)
            soup = BeautifulSoup(r.content, "html.parser")
            all_decorations = soup.find_all("tr")
            rampage_decorations = []
            for decoration in all_decorations:
                decoration_name = decoration.find_all("td")[0].text
                print(decoration_name)
                try:
                    skill_id = decoration.find("a")["href"].split("skills/")[1]
                    skill_name = decoration.find("a").text
                except IndexError:
                    skill_id = 0
                    skill_name = ""
                print(skill_name)
                skill_description = decoration.find_all("td")[-1].text
                print(skill_description)
                rampage_decorations.append((decoration_name, skill_id, skill_name, skill_description))
            # return rampage_decorations
            mycursor = mydb.cursor(buffered=True)
            for decoration in rampage_decorations:
                mycursor.execute("SELECT COUNT(*) FROM rampage_decorations WHERE rampage_deco_name = %s",
                                 [decoration[0]])
                exists = mycursor.fetchall()[0][0]
                if exists == 0:
                    sql = "INSERT INTO rampage_decorations (rampage_deco_name, rampage_deco_skill_id, rampage_deco_skill_name, rampage_deco_skill_description) VALUES (%s, %s, %s, %s)"

                    mycursor.execute(sql, decoration)
            mydb.commit()

        def get_switch_skills(self):
            switch_skill_url = f"{base_url}data/switch-actions"
            session = requests.Session()
            r = session.get(switch_skill_url, headers=headers)
            soup = BeautifulSoup(r.content, "html.parser")
            all_switch_skills = soup.find_all("tr")
            switch_skills = []
            for switch_skill in all_switch_skills:
                switch_skill_name = switch_skill.find_all("td")[0].text
                print(switch_skill_name)
                switch_skill_description = switch_skill.find_all("td")[1].text
                print(switch_skill_description)
                switch_skills.append((switch_skill_name, switch_skill_description))
            # return switch_skills
            mycursor = mydb.cursor(buffered=True)
            for skill in switch_skills:
                mycursor.execute("SELECT COUNT(*) FROM switch_skills WHERE switch_skill_name = %s",
                                 [skill[0]])
                exists = mycursor.fetchall()[0][0]
                if exists == 0:
                    sql = "INSERT INTO switch_skills (switch_skill_name, switch_skill_description) VALUES " \
                          "(%s, %s)"

                    mycursor.execute(sql, skill)
                elif exists != 0 and skill[0] == "":
                    sql = "INSERT INTO switch_skills (switch_skill_name, switch_skill_description) VALUES " \
                          "(%s, %s)"

                    mycursor.execute(sql, skill)
            mydb.commit()

        def get_dango_skills(self):
            dango_skill_url = f"{base_url}data/kitchen-skills"
            session = requests.Session()
            r = session.get(dango_skill_url, headers=headers)
            soup = BeautifulSoup(r.content, "html.parser")
            all_dango_skills = soup.find_all("tr")
            dango_skills = []
            for dango_skill in all_dango_skills:
                dango_skill_name = dango_skill.find_all("td")[0].text
                print(dango_skill_name)
                dango_skill_description = dango_skill.find_all("td")[1].find("p").text
                print(dango_skill_description)
                dango_skill_levels = []
                level_descriptions = dango_skill.find_all("td")[1].find_all("small")

                for description in level_descriptions:
                    # print(description)
                    dango_skill_levels.append(description.text.strip())
                # print(dango_skill_levels)
                dango_skill_levels = json.dumps(dango_skill_levels)
                dango_skills.append((dango_skill_name, dango_skill_description, dango_skill_levels))
            # return dango_skills
            mycursor = mydb.cursor(buffered=True)
            for skill in dango_skills:
                # print(skill)
                mycursor.execute("SELECT COUNT(*) FROM dango_skills WHERE dango_skill_name = %s",
                                 [skill[0]])
                exists = mycursor.fetchall()[0][0]
                if exists == 0:
                    sql = "INSERT INTO dango_skills (dango_skill_name, dango_skill_description, dango_skill_levels) VALUES " \
                          "(%s, %s, %s)"

                    mycursor.execute(sql, skill)
            mydb.commit()

        def get_canteen_dango(self):
            dango_url = f"{base_url}data/dangos"
            session = requests.Session()
            r = session.get(dango_url, headers=headers)
            soup = BeautifulSoup(r.content, "html.parser")
            all_dango = soup.find_all("tr")
            canteen_dango = []
            for dango in all_dango:
                dango_name = dango.find_all("td")[0].text
                # print(dango_name)
                find_dango_description = dango.find_all("td")[1].find_all("div")
                dango_description = ""
                dango_skills = []
                for description in find_dango_description:
                    dango_description += description.text
                    if description.find("a") is not None:
                        dango_skill = description.find("a").text
                        dango_skill_id = description.find("a")["href"].split("skills/")[1]
                        dango_skills.append({dango_skill_id: description.find("a").text})
                # print(dango_skills)
                dango_skills = json.dumps(dango_skills)
                canteen_dango.append((dango_name, dango_description, dango_skills))
            print(canteen_dango)
            # return canteen_dango
            mycursor = mydb.cursor(buffered=True)
            for dango in canteen_dango:
                mycursor.execute("SELECT COUNT(*) FROM canteen_dango WHERE dango_name = %s",
                                 [dango[0]])
                exists = mycursor.fetchall()[0][0]
                if exists == 0:
                    sql = "INSERT INTO canteen_dango (dango_name, dango_description, dango_skills) VALUES " \
                          "(%s, %s, %s)"

                    mycursor.execute(sql, dango)
            mydb.commit()

    class Armour:

        async def process_armour_sets(self, session, idx, item):
            if not item.text:
                item_text = "Base Commander Set"
            else:
                item_text = item.text

            async with session.get(fx_url + item["href"], headers=headers) as r:
                soup = BeautifulSoup(await r.text(), "html.parser")
                set_img = soup.select("#infobox > div > table > tbody > tr:nth-child(2) > td > h4 > img")
                if not set_img:
                    set_img = soup.select(
                        "#infobox > div.table-responsive > table > tbody > tr:nth-child(2) > td > img")
                elif not set_img:
                    set_img = soup.select(
                        "wiki-content-block > div.row > div > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > h4 > img")
                # print(set_img)
                try:
                    set_img = fx_url + set_img[0]["src"]
                except IndexError:
                    set_img = ""
                tables = soup.find_all("tbody")

                if len(tables) > 1:
                    table = tables[1]
                    find_pieces = []
                    rows = table.find_all("tr")
                    for row in rows:
                        first_td = row.find("td")
                        if first_td is not None:
                            find_pieces.append(first_td)
                else:
                    print("Table not found or index out of range.")
                pieces = []
                for p in find_pieces:
                    if p.find("img") is not None:
                        piece_img = fx_url + p.find("img")["src"]
                    else:
                        piece_img = ""
                    pieces.append({p.text.strip(): piece_img})
                return {'id': idx, 'item': item_text, 'img': set_img, 'pieces': pieces}

        async def get_armour_sets(self):

            url = f"{fx_url}/Armor+Sets"

            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=headers) as r:
                    soup = BeautifulSoup(await r.text(), "html.parser")
                    # print(soup)
                    div_elements = soup.select("div.col-xs-4") + soup.select("div.col-sm-4")
                    find_all_armour_sets = [element.find("a", attrs={"class": "wiki_link"}) for element in div_elements
                                            if element.find("a", attrs={"class": "wiki_link"}) is not None]
                    tasks = []
                    for idx, item in enumerate(find_all_armour_sets, start=1):
                        task = asyncio.create_task(self.process_armour_sets(session, idx, item))
                        tasks.append(task)

                    all_armour_sets = await asyncio.gather(*tasks)
                    print(all_armour_sets)
                    mycursor = mydb.cursor(buffered=True)

                    for armour in all_armour_sets:
                        set_id = armour["id"]
                        set_name = armour["item"]
                        set_img = armour["img"]
                        armour_pieces = json.dumps(armour["pieces"])

                        mycursor.execute("SELECT COUNT(*) FROM armour_sets WHERE set_id = %s",
                                         [set_id])
                        exists = mycursor.fetchall()[0][0]
                        print(exists)
                        if exists == 0:
                            sql = "INSERT INTO armour_sets (set_id, set_name, set_img, armour_pieces) VALUES (%s, %s, %s, %s)"

                            mycursor.execute(sql, (set_id, set_name, set_img, armour_pieces))
                    mydb.commit()
                    return all_armour_sets

        # async def process_armour(self, session, url):
        #     async with session.get(url) as response:
        #         return await response.text()
        #
        # async def get_all_armour(self):
        #     armours = []
        #     armour_sets = await self.get_armour_sets()
        #
        #     async with aiohttp.ClientSession() as session:
        #         tasks = [self.process_armour(session, f"{base_url}data/armors?view={i}") for i in range(10)]
        #         pages = await asyncio.gather(*tasks)
        #
        #     num_pieces = 0
        #     for i, page in enumerate(pages):
        #         soup = BeautifulSoup(page, "html.parser")
        #         all_armour = soup.find_all("tr")
        #         for armour in all_armour:
        #             # print(armour)
        #             num_pieces += 1
        #             print("Pieces:" + str(num_pieces))
        #             rarity = str(i + 1)
        #             armour_id = armour.find("a")["href"].split("armors/")[1]
        #             # print(armour_id)
        #             armour_name = armour.find("a").text
        #             print(armour_name)
        #             armour_name_split = armour_name.split(" ")
        #             print(armour_name_split)
        #             print("**************")
        #             result = [armour_name_split[0]]
        #             if len(armour_name_split) >= 3 and armour_name_split[2] in ["S", "X"]:
        #                 result.append(armour_name_split[2])
        #             print(result)
        #
        #             # print(armour_name.split(" ")[:2])
        #             armour_url = armour.find("a")["href"]
        #             # print(armour_url)
        #             m_armour_img_url = armour.find_all("img")[0]["src"]
        #             f_armour_img_url = armour.find_all("img")[1]["src"]
        #             # print(m_armour_img_url)
        #             # print(f_armour_img_url)
        #             find_deco_slots = armour.find_all("td")[3].find_all("img")
        #             deco_slots = []
        #             for deco in find_deco_slots:
        #                 # print(deco)
        #                 deco_slots.append(deco["src"].split("ui/")[1].split(".")[0])
        #             deco_slots = json.dumps(deco_slots)
        #             # print(deco_slots)
        #
        #             defense = armour.find_all("td")[4].find("div").text
        #             # print(defense)
        #             fire_res = armour.find_all("td")[4].find_all("div")[1].find("span",
        #                                                                         attrs={
        #                                                                             "data-key": "elementAttack"}).text
        #             # print(fire_res)
        #             water_res = armour.find_all("td")[4].find_all("div")[2].find("span",
        #                                                                          attrs={
        #                                                                              "data-key": "elementAttack"}).text
        #             # print(water_res)
        #             ice_res = armour.find_all("td")[5].find_all("div")[0].find("span",
        #                                                                        attrs={"data-key": "elementAttack"}).text
        #             # print(ice_res)
        #             thunder_res = armour.find_all("td")[5].find_all("div")[1].find("span",
        #                                                                            attrs={
        #                                                                                "data-key": "elementAttack"}).text
        #             # print(thunder_res)
        #             dragon_res = armour.find_all("td")[5].find_all("div")[2].find("span",
        #                                                                           attrs={
        #                                                                               "data-key": "elementAttack"}).text
        #             # print(dragon_res)
        #
        #             find_armour_skills = armour.find_all("td")[-1].find_all("div")
        #             armour_skills = []
        #             for skill in find_armour_skills:
        #                 skill_id = skill.find("a")["href"].split("skills/")[1]
        #                 skill_name = skill.find("a").text
        #                 skill_lvl = skill.contents[1].strip()
        #                 # print(skill_id)
        #                 # print(skill_lvl)
        #                 armour_skills.append({"skill_id": skill_id, "skill_name": skill_name, "lvl": skill_lvl})
        #             armour_skills = json.dumps(armour_skills)
        #             # print(armour_skills)
        #
        #             armour_description, forging_materials = self.get_armour_details(armour_url)
        #             forging_materials = json.dumps(forging_materials)
        #             # print(armour_description)
        #             # print(forging_materials)
        #             set_id = 0
        #             set_name = ""
        #             for armour_set in armour_sets:
        #                 # print(type(armour_set["pieces"]))
        #                 for piece in armour_set["pieces"]:
        #                     # print(piece)
        #                     # print(type(piece))
        #                     if armour_name in piece:
        #                         # print(armour_set["item"])
        #                         set_name = armour_set["item"]
        #                         set_id = armour_set["id"]
        #                         # matched +=1
        #                         # print("Matched:"+str(matched))
        #                         break
        #             print(armour_id, armour_name, set_id, set_name)
        #             armours.append(
        #                 (armour_id, armour_name, armour_url, m_armour_img_url, f_armour_img_url, deco_slots,
        #                  defense, fire_res, water_res, ice_res, thunder_res, dragon_res, armour_skills,
        #                  armour_description, forging_materials, rarity, set_id, set_name))
        #
        #     self.save_armour(armours)
        def get_all_armour(self):
            armours = []
            armour_sets = asyncio.run(self.get_armour_sets())
            # armour_sets = self.get_armour_sets()
            # for armour_set in armour_sets:
            matched = 0
            num_pieces = 0
            for i in range(0, 10):
                url = f"{base_url}data/armors?view={i}"
                session = requests.Session()
                r = session.get(url, headers=headers)
                soup = BeautifulSoup(r.content, "html.parser")
                all_armour = soup.find_all("tr")
                for armour in all_armour:
                    # print(armour)
                    num_pieces += 1
                    print("Pieces:" + str(num_pieces))
                    rarity = str(i + 1)
                    armour_id = armour.find("a")["href"].split("armors/")[1]
                    # print(armour_id)
                    armour_name = armour.find("a").text
                    print(armour_name)
                    armour_name_split = armour_name.split(" ")
                    print(armour_name_split)
                    print("**************")
                    result = [armour_name_split[0]]
                    if len(armour_name_split) >= 3 and armour_name_split[2] in ["S", "X"]:
                        result.append(armour_name_split[2])
                    print(result)

                    # print(armour_name.split(" ")[:2])
                    armour_url = armour.find("a")["href"]
                    # print(armour_url)
                    m_armour_img_url = armour.find_all("img")[0]["src"]
                    f_armour_img_url = armour.find_all("img")[1]["src"]
                    # print(m_armour_img_url)
                    # print(f_armour_img_url)
                    find_deco_slots = armour.find_all("td")[3].find_all("img")
                    deco_slots = []
                    for deco in find_deco_slots:
                        # print(deco)
                        deco_slots.append(deco["src"].split("ui/")[1].split(".")[0])
                    deco_slots = json.dumps(deco_slots)
                    # print(deco_slots)

                    defense = armour.find_all("td")[4].find("div").text
                    # print(defense)
                    fire_res = armour.find_all("td")[4].find_all("div")[1].find("span",
                                                                                attrs={
                                                                                    "data-key": "elementAttack"}).text
                    # print(fire_res)
                    water_res = armour.find_all("td")[4].find_all("div")[2].find("span",
                                                                                 attrs={
                                                                                     "data-key": "elementAttack"}).text
                    # print(water_res)
                    ice_res = armour.find_all("td")[5].find_all("div")[0].find("span",
                                                                               attrs={"data-key": "elementAttack"}).text
                    # print(ice_res)
                    thunder_res = armour.find_all("td")[5].find_all("div")[1].find("span",
                                                                                   attrs={
                                                                                       "data-key": "elementAttack"}).text
                    # print(thunder_res)
                    dragon_res = armour.find_all("td")[5].find_all("div")[2].find("span",
                                                                                  attrs={
                                                                                      "data-key": "elementAttack"}).text
                    # print(dragon_res)

                    find_armour_skills = armour.find_all("td")[-1].find_all("div")
                    armour_skills = []
                    for skill in find_armour_skills:
                        skill_id = skill.find("a")["href"].split("skills/")[1]
                        skill_name = skill.find("a").text
                        skill_lvl = skill.contents[1].strip()
                        # print(skill_id)
                        # print(skill_lvl)
                        armour_skills.append({"skill_id": skill_id, "skill_name": skill_name, "lvl": skill_lvl})
                    armour_skills = json.dumps(armour_skills)
                    # print(armour_skills)

                    armour_description, forging_materials = self.get_armour_details(armour_url)
                    forging_materials = json.dumps(forging_materials)
                    # print(armour_description)
                    # print(forging_materials)
                    set_id = None
                    set_name = None
                    for armour_set in armour_sets:
                        # print(type(armour_set["pieces"]))
                        for piece in armour_set["pieces"]:
                            # print(piece)
                            # print(type(piece))
                            if armour_name in piece:
                                # print(armour_set["item"])
                                set_name = armour_set["item"]
                                set_id = armour_set["id"]
                                # matched +=1
                                # print("Matched:"+str(matched))
                                break
                    # print(armour_id, armour_name, set_id, set_name)
                    armours.append(
                        (armour_id, armour_name, armour_url, m_armour_img_url, f_armour_img_url, deco_slots,
                         defense, fire_res, water_res, ice_res, thunder_res, dragon_res, armour_skills,
                         armour_description, forging_materials, rarity, set_id, set_name))

            print(num_pieces)
            print(len(armours))
            self.save_armour(armours)

        def get_armour_details(self, armour_url):
            session = requests.Session()
            r = session.get(armour_url, headers=headers)
            soup = BeautifulSoup(r.content, "html.parser")
            try:
                armour_description = soup.find("header", attrs={"class": "mb-9 space-y-1"}).find_all("p")[1].text
            except IndexError:
                armour_description = ""
            # print(armour_description)
            find_forging_materials = soup.find_all("div", attrs={"class": "basis-1/2"})[0].find_all("tr")
            forging_materials = []

            for material in find_forging_materials:
                item_id = material.find_all("td")[0].find("a")["href"].split("items/")[1]
                item_name = material.find_all("td")[0].find("a").text
                # print(item_id)
                quantity = material.find_all("td")[1].text.strip()
                # print(quantity)
                forging_materials.append({"Item ID": item_id, "Item Name": item_name, "Quantity": quantity})
            # print(forging_materials)

            return armour_description, forging_materials

        def save_armour(self, armours):
            print(armours)
            mycursor = mydb.cursor(buffered=True)

            for armour in armours:
                mycursor.execute("SELECT COUNT(*) FROM armour WHERE armour_id = %s",
                                 [armour[0]])
                exists = mycursor.fetchall()[0][0]
                print(exists)
                if exists == 0:
                    sql = "INSERT INTO armour (armour_id, armour_name, armour_url, m_armour_img_url, f_armour_img_url, deco_slots, defense," \
                          " fire_res, water_res, ice_res, thunder_res, dragon_res, armour_skills, armour_description, forging_materials, rarity, set_id, set_name) VALUES " \
                          "(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"

                    mycursor.execute(sql, armour)
            mydb.commit()

            forging_item_ids = []
            forging_list = []
            for item in armours:
                print(item)
                list3 = []
                if item[14] != []:
                    for j in json.loads(item[14]):
                        forging_item_ids.append(j.get("Item ID"))
                        list3.append(j.get("Item ID"))
                res1 = {item[0]: list3}
                forging_list.append(res1)
            rows = []
            for dictionary in forging_list:
                for armour_id, item_ids in dictionary.items():
                    for item_id in item_ids:
                        rows.append((armour_id, item_id))
            print(rows)
            for row in rows:
                mycursor = mydb.cursor()
                mycursor.execute("SELECT COUNT(*) FROM armour_items WHERE armour_id = %s AND item_id = %s",
                                 [row[0], row[1]])
                exists = mycursor.fetchall()[0][0]
                if exists == 0:
                    sql = "INSERT INTO armour_items (armour_id, item_id) VALUES (%s, %s)"
                    mycursor.execute(sql, row)
            mydb.commit()

            skill_ids = []
            skill_list = []
            for skill in armours:
                list3 = []
                if skill[12] != []:
                    for j in json.loads(skill[12]):
                        skill_ids.append(j.get("skill_id"))
                        list3.append(j.get("skill_id"))
                res1 = {skill[0]: list3}
                skill_list.append(res1)
            rows = []
            for dictionary in skill_list:
                for armour_id, skill_ids in dictionary.items():
                    for skill_id in skill_ids:
                        rows.append((armour_id, skill_id))
            print(rows)
            for row in rows:
                mycursor = mydb.cursor()
                mycursor.execute("SELECT COUNT(*) FROM armour_armour_skills WHERE armour_id = %s AND skill_id = %s",
                                 [row[0], row[1]])
                exists = mycursor.fetchall()[0][0]
                if exists == 0:
                    sql = "INSERT INTO armour_armour_skills (armour_id, skill_id) VALUES (%s, %s)"
                    mycursor.execute(sql, row)
            mydb.commit()


webscrape = Scraper(headers, base_url, mydb)
webscrape.Monsters().get_monsters()
# webscrape.Items().get_all_items()
# webscrape.Weapons().get_all_weapons()
# webscrape.Skills().get_skills()
# webscrape.Armour().get_all_armour()

# webscrape = Scraper(headers, base_url)

# webscrape.get_monsters()
# webscrape.get_all_items()
# webscrape.get_all_weapons()
# webscrape.get_skills()
# webscrape.get_all_armour()
