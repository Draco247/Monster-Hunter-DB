import csv
import urllib.request
# from PIL import Image
from bs4 import BeautifulSoup
import requests
# import Levenshtein
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
import string

load_dotenv()

headers = ({'User-Agent':
                'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
            'Accept-Language': 'en-US, en;q=0.5'})
base_url = "https://mhrise.kiranico.com/"
fx_url = "https://monsterhunterrise.wiki.fextralife.com"
game8_url = "https://game8.co"
fandom_wiki_url = "https://monsterhunter.fandom.com/wiki"
mydb = mysql.connector.connect(
    host=os.getenv('DEV_MYSQL_HOST'),
    user=os.getenv('DEV_MYSQL_USER'),
    password=os.getenv('DEV_MYSQL_PW'),
    database=os.getenv('DEV_MYSQL_DB')
)


# mydb = mysql.connector.connect(
#     host=os.getenv('SPRING_MYSQL_HOST'),
#     user=os.getenv('SPRING_MYSQL_USER'),
#     password=os.getenv('SPRING_MYSQL_PW'),
#     database=os.getenv('SPRING_MYSQL_DB')
# )


class Scraper(object):

    def __init__(self, headers, base_url, mydb):
        self.headers = headers
        self.base_url = base_url
        self.mydb = mydb

    # def download_image(image_url, name, type):
    #     if type == "armour":
    #         save_path = f"monster-hunter-db\\src\\assets\\armour images\\{name}.png"
    #     try:
    #         # Send an HTTP GET request to the URL
    #         response = requests.get(image_url)
            
    #         # Check if the request was successful (status code 200)
    #         if response.status_code == 200:
    #             # Open the file for binary write
    #             with open(save_path, 'wb') as file:
    #                 # Write the content of the response to the file
    #                 file.write(response.content)
    #             print(f"Image downloaded and saved as {save_path}")
    #         else:
    #             print(f"Failed to download image. Status code: {response.status_code}")
    #     except Exception as e:
    #         print(f"An error occurred: {str(e)}")

    class Monsters:
        def get_monster_types(self):
            url = f"{fandom_wiki_url}/Monster_Classes"
            session = requests.Session()
            r = session.get(url, headers=headers)
            soup = BeautifulSoup(r.content, "html.parser")
            monster_type_tables = soup.find("div", attrs={"class": "mw-parser-output"}).find_all("table")[:19]
            monster_types = {}
            for table in monster_type_tables:
                monster_type_name = table.find("h2").text.split(":")[1].rsplit("/", 1)[0].strip()
                # for monster_table in table.find_all("td", attrs={"bgcolor": "#abcdef"}):
                #     for monster in monster_table.find_all("a"):
                #         print(monster.text)
                #         print("-------------------------------")
                monsters = [monster.text for monster_table in table.find_all("td", attrs={"bgcolor": "#abcdef"}) for monster in monster_table.find_all("a")]
                # print(monster_type_name)
                # monsters = [monster.text for monster_table in table.find_all("td", attrs={"bgcolor": "#abcdef"}) for monster in monster_table if monster.text != ", " and monster.text != "\n"]
                # print(monsters)
                monster_types[monster_type_name] = monsters
            return monster_types


        def get_monsters(self):
            monster_types = self.get_monster_types()
            # for monster_type,monsters in monster_types.items():
            #     print(monster_type)
            #     print(monsters)
            #     for i in monsters:
            #         print(i)
            #         print("***************")
            #     print("------------------------------")
            self.get_large_monster(monster_types)
            self.get_small_monster(monster_types)

        def get_large_monster(self, monster_types):
            url = f"{base_url}data/monsters?view=lg"
            session = requests.Session()
            r = session.get(url, headers=headers)
            soup = BeautifulSoup(r.content, "html.parser")
            self.get_monster_pages(soup, "large", monster_types)

        def get_small_monster(self, monster_types):
            url = f"{base_url}data/monsters?view=sm"
            session = requests.Session()
            r = session.get(url, headers=headers)
            soup = BeautifulSoup(r.content, "html.parser")
            self.get_monster_pages(soup, "small", monster_types)

        def get_monster_pages(self, soup, monster_size, monster_types):
            all_monsters = soup.find_all("div", attrs={
                "class": "group relative p-4 border-r border-b border-gray-200 dark:border-gray-800 sm:p-6"})
            for monster in all_monsters:
                monster_name = monster.find('a')
                monster_name = monster_name.text.strip()
                monster_img = monster.find('img')["src"]
                link = monster.find('a')['href']
                monster_id = link.split("monsters/")[1]
                monster_type = ""
                
                for mtype, monsters in monster_types.items():
                    # print(monster_name)
                    # print(monsters[0])
                    # print("-----------------------")
                    if monster_name in monsters:
                        print(monster_name)
                        print(mtype) 
                        monster_type = mtype
                        break

                session = requests.Session()
                r = session.get(link, headers=headers)
                soup = BeautifulSoup(r.content, "html.parser")
                monster_description = soup.find("header", attrs={"class": "mb-9 space-y-1"}).find_all("p")[1].text
                mycursor = mydb.cursor()
                mycursor.execute("SELECT COUNT(*) from monsters2 WHERE monster_id = %s", [monster_id])
                exists = mycursor.fetchall()
                if exists[0][0] == 0:
                    sql = "INSERT INTO monsters2 (name, link, image_link, monster_id, description, monster_size, monster_type) VALUES (%s,%s,%s,%s,%s,%s,%s)"
                    val = ([monster_name, link, monster_img, monster_id, monster_description, monster_size, monster_type])
                    mycursor = mydb.cursor()
                    mycursor.execute(sql, val)
                    self.get_monster_details(soup, monster_id)

                else:
                    self.get_monster_details(soup, monster_id)
            mydb.commit()

        def get_monster_details(self, soup, monster_id):
            # hitzones = []
            self.get_monster_physiology(soup, monster_id)
            # print(self.get_monster_physiology(monster_name, monster_id))
            # drops = []
            self.get_monster_drops(soup, monster_id)

            # quests = []
            # self.get_monster_quests(soup, monster_id)

        def get_monster_physiology(self, soup, monster_id):
            hitzones = []
            monster_hitzones = soup.find_all('table')[0]  # find monster phys table on page
            rows = monster_hitzones.find_all('tr')
            for row in rows:  # extract all important details from the table such as hitzone values for the different weapon types
                hitzone = row.find_all('td')[0].text
                hitzone_state = row.find_all('td')[1].text
                blade_hitzone_value = row.find_all('td')[2].text
                blunt_hitzone_value = row.find_all('td')[3].text
                gunner_hitzone_value = row.find_all('td')[4].text
                fire_hitzone_value = row.find_all('td')[5].text
                water_hitzone_value = row.find_all('td')[6].text
                ice_hitzone_value = row.find_all('td')[7].text
                thunder_hitzone_value = row.find_all('td')[8].text
                dragon_hitzone_value = row.find_all('td')[9].text
                stun_hitzone_value = row.find_all('td')[10].text
                hitzones.append({'hitzone': hitzone, 'state': hitzone_state, 'blade hitzone': blade_hitzone_value,
                                 'blunt hitzone': blunt_hitzone_value,
                                 'gunner hitzone': gunner_hitzone_value, 'fire hitzone': fire_hitzone_value,
                                 'water hitzone': water_hitzone_value,
                                 'ice hitzone': ice_hitzone_value, 'thunder hitzone': thunder_hitzone_value,
                                 'dragon hitzone': dragon_hitzone_value,
                                 'stun': stun_hitzone_value})
            hitzones = json.dumps(hitzones)
            mycursor = mydb.cursor()
            mycursor.execute("UPDATE monsters2 SET hitzones = %s WHERE monster_id = %s", [hitzones, monster_id])
            # return hitzones
            # return monster_hitzones
        # def get_monster_physiology_and_render(self, monster_name, monster_id):
        #     hitzones = []
        #     url = f"{fx_url}/"
        #     # words = monster_name.split(" ")
        #     url += "+".join(monster_name.split(" "))
        #     session = requests.Session()
        #     r = session.get(url, headers=headers)
        #     soup = BeautifulSoup(r.content, "html.parser")
        #     # print(soup.find_all("table", attrs={"class":"wiki_table"})[0])
        #     monster_info_table = soup.find_all("table", attrs={"class": "wiki_table"})[0].find_all("tr")
        #     # print(monster_info_table)
        #     monster_render = fx_url + monster_info_table[1].find("img")["src"]
        #     print(monster_render)
        #     monster_species_type = ""
        #     monster_threat_level = ""
        #     monster_locations = []
        #     for row in monster_info_table:
        #         # print(row)
        #         tds = row.find_all("td")
        #         # print(tds)

        #         if len(tds) > 0 and ("Species" in tds[0] or "Class" in tds[0]):
        #             monster_species_type = tds[1].text
        #             # print(monster_species_type)
        #         if len(tds) > 0 and "Threat Level" in tds[0]:
        #             star = [i for i in tds[1].text]
        #             num = [i for i in tds[1].text if i.isdigit()]
        #             if num:
        #                 monster_threat_level = "".join(num)
        #             else:
        #                 monster_threat_level = len(star)
        #             # print(monster_threat_level)
        #         if len(tds) > 0 and ("Location(s)" in tds[0] or "Locations" in tds[0]):
        #             monster_locations = [location.text for location in tds[1] if
        #                                  len(location) != 0 and "\xa0" not in location]
        #             # for location in tds[1]:
        #             #     print(location.text)
        #             # print
        #             # print(monster_locations)

        #     monster_phys_hitzones_table = soup.find_all("table", attrs={"class": "wiki_table"})[1].find_all("tr")
        #     phys_hitzones = []
        #     for row in monster_phys_hitzones_table[1:]:
        #         hitzone = row.find("th").text
        #         # print(hitzone)
        #         blade_hitzone = row.find_all("td")[0].text
        #         # print(blade_hitzone)
        #         blunt_hitzone = row.find_all("td")[1].text
        #         # print(blunt_hitzone)
        #         gunner_hitzone = row.find_all("td")[2].text
        #         # print(gunner_hitzone)
        #         phys_hitzones.append({'hitzone': hitzone, 'blade_hitzone': blade_hitzone,
        #                               'blunt_hitzone': blunt_hitzone, 'gunner_hitzone': gunner_hitzone})

        #     monster_ele_hitzones_table = soup.find_all("table", attrs={"class": "wiki_table"})[2].find_all("tr")
        #     ele_hitzones = []
        #     for row in monster_ele_hitzones_table[1:]:
        #         hitzone = row.find("th").text
        #         # print(hitzone)
        #         fire_hitzone = row.find_all("td")[0].text
        #         # print(fire_hitzone)
        #         water_hitzone = row.find_all("td")[1].text
        #         # print(water_hitzone)
        #         thunder_hitzone = row.find_all("td")[2].text
        #         # print(thunder_hitzone)
        #         ice_hitzone = row.find_all("td")[3].text
        #         # print(ice_hitzone)
        #         dragon_hitzone = row.find_all("td")[4].text
        #         # print(dragon_hitzone)
        #         ele_hitzones.append({'hitzone': hitzone, 'fire_hitzone': fire_hitzone, 'water_hitzone': water_hitzone,
        #                              'ice_hitzone': ice_hitzone, 'thunder_hitzone': thunder_hitzone,
        #                              'dragon_hitzone': dragon_hitzone, })
        #     # print(monster_phys_hitzones_table)
        #     # print(phys_hitzones)
        #     # print(ele_hitzones)

        #     hitzones = [phys_hitzones[i] | ele_hitzones[i] for i in range(0, len(phys_hitzones))]
        #     hitzones = json.dumps(hitzones)
        #     # mycursor = mydb.cursor()
        #     # mycursor.execute("UPDATE monsters SET hitzones = %s WHERE monster_id = %s", [hitzones, monster_id])
        #     # print(mycursor)
        #     mydb.commit()
        #     return monster_render, hitzones

        #     # return monster_name, monster_species_type, monster_threat_level, monster_locations
        #     # print(monster_locations)
        #     # monster_species_type = monster_info_table.find_all("tr")[3].find("a").text
        #     # print(monster_species_type)
        #     # monster_threat_level = monster_info_table.find_all("tr")[4].find_all("td")[1].text
        #     # print(monster_threat_level)

        #     # monster_hitzones = soup.find_all('table')[0]  # find monster phys table on page
        #     # rows = monster_hitzones.find_all('tr')
        #     # for row in rows:  # extract all important details from the table such as hitzone values for the different weapon types
        #     #     hitzone = row.find_all('td')[0].text
        #     #     hitzone_state = row.find_all('td')[1].text
        #     #     blade_hitzone_value = row.find_all('td')[2].text
        #     #     blunt_hitzone_value = row.find_all('td')[3].text
        #     #     gunner_hitzone_value = row.find_all('td')[4].text
        #     #     fire_hitzone_value = row.find_all('td')[5].text
        #     #     water_hitzone_value = row.find_all('td')[6].text
        #     #     ice_hitzone_value = row.find_all('td')[7].text
        #     #     thunder_hitzone_value = row.find_all('td')[8].text
        #     #     dragon_hitzone_value = row.find_all('td')[9].text
        #     #     stun_hitzone_value = row.find_all('td')[10].text
        #     #     hitzones.append({'hitzone': hitzone, 'state': hitzone_state, 'blade hitzone': blade_hitzone_value,
        #     #                      'blunt hitzone': blunt_hitzone_value,
        #     #                      'gunner hitzone': gunner_hitzone_value, 'fire hitzone': fire_hitzone_value,
        #     #                      'water hitzone': water_hitzone_value,
        #     #                      'ice hitzone': ice_hitzone_value, 'thunder hitzone': thunder_hitzone_value,
        #     #                      'dragon hitzone': dragon_hitzone_value,
        #     #                      'stun': stun_hitzone_value})
        #     # hitzones = json.dumps(hitzones)
        #     # mycursor = mydb.cursor()
        #     # mycursor.execute("UPDATE monsters SET hitzones = %s WHERE monster_id = %s", [hitzones, monster_id])
        #     # return hitzones
        #     # return monster_hitzones

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

            mycursor.execute("UPDATE monsters2 SET drops = %s WHERE monster_id = %s", [drops, monster_id])


    class Weapons:

        # async def process_weapons(self, session, link):
        #     async with session.get(link, headers=headers) as r:
        #         print(link)
        #         soup = BeautifulSoup(await r.text(), "html.parser")
        #         # print(soup)
        #         tree_names = [i.text for i in soup.find_all("h3", attrs={"class": "a-header--3"})[:-2]]
        #         find_trees = soup.find_all("table", attrs={"class": "a-table"})
        #         # tree_weapons = [[j.find("a").text for j in i.find_all("div")]for i in find_trees]
        #         tree_weapons = []
        #         for i in find_trees[1:-3]:
        #             # print(i.text.strip())
        #             lines = i.text.strip().split("\n")
        #             weapon_names = [weapon.text.strip() for weapon in i.find_all("a")]

        #             # Create a dictionary to store parent-child relationships
        #             parent_child_map = {}

        #             # Initialize variables to keep track of the current parent and child
        #             current_parent = ""
        #             current_child = ""

        #             # Iterate through each line
        #             for line in lines:
        #                 stripped_line = line.strip()
        #                 indent_level = line.index(stripped_line[0])
                        
        #                 if stripped_line.startswith("┣") or stripped_line.startswith("┃"):
        #                     if indent_level == lines.index(line) - 1:  # Check if it's the last child of the current parent
        #                         current_parent = stripped_line.split()[1]
        #                         current_child = stripped_line.split()[-1]
        #                         parent_child_map[current_parent] = current_child
        #                 else:
        #                     current_parent = stripped_line.split()[0]

        #             # Print the parent-child relationships
        #             for parent, child in parent_child_map.items():
        #                 print((parent, child))
                    
        #             # for i in range(len(lines)):
        #             #     if i == 0:
        #             #         print(lines[i])
        #             #         print("-----------")
        #             #     else:
        #             #         print(lines[i])
        #             #         print(lines[i-1])
        #             #         # Iterate through the string
        #             #         for j in range(len(lines[i])):
        #             #             if not lines[i][j].isalnum():
        #             #                 last_non_alnum = lines[i][j]
        #             #             else:
        #             #                 break  # Stop when you encounter an alphanumeric character

        #             #         print(last_non_alnum)
        #             #         print("--------------")
                        
        #         return tree_names, tree_weapons

        # async def get_weapon_trees(self):
        #     url = f"{game8_url}/games/Monster-Hunter-Rise/archives/315349"
        #     async with aiohttp.ClientSession() as session:
        #         async with session.get(url, headers=headers) as r:
        #             soup = BeautifulSoup(await r.text(), "html.parser")
        #             melee_weapons = soup.find_all("table", attrs={"class": "a-table"})[1].find_all("td")
        #             ranged_weapons = soup.find_all("table", attrs={"class": "a-table"})[2].find_all("td")
        #             weapons = melee_weapons + ranged_weapons

        #             weapon_tree_links = []
        #             for i in weapons:
        #                 weapon_tree_links.append(f'{game8_url}/games/Monster-Hunter-Rise/archives/{i.find_all("a")[1]["href"].split("archives/")[1]}')

        #             # print(weapon_tree_links)

        #             tasks = []
        #             for i in weapon_tree_links:
        #                 task = asyncio.create_task(self.process_weapons(session, i))
        #                 tasks.append(task)

        #             all_trees = await asyncio.gather(*tasks)

        #             # Here, you can print or process the results for each link separately.
        #             for link, trees in zip(weapon_tree_links, all_trees):
        #                 print(f"Trees from {link}: {trees}")

        def save_weapons(self, i, results):
            print(results)

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
            # weapon_trees = asyncio.run(self.get_weapon_trees())
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

        def download_image(self,image_url, name):
            save_path = f"monster-hunter-db\\src\\assets\\item images\\{name}.png"
            try:
                # Check if the file already exists
                if os.path.exists(save_path):
                    print(f"Image already exists at {save_path}")
                    return
                
                # Send an HTTP GET request to the URL
                response = requests.get(image_url)
                
                # Check if the request was successful (status code 200)
                if response.status_code == 200:
                    # Open the file for binary write
                    with open(save_path, 'wb') as file:
                        # Write the content of the response to the file
                        file.write(response.content)
                    print(f"Image downloaded and saved as {save_path}")
                else:
                    print(f"Failed to download image. Status code: {response.status_code}")
            except Exception as e:
                print(f"An error occurred: {str(e)}")

        # async def process_armour_sets(self, session, idx, item):
        #     if not item.text:
        #         item_text = "Base Commander Set"
        #     else:
        #         item_text = item.text

        #     async with session.get(fx_url + item["href"], headers=headers) as r:
        #         # print(fx_url + item["href"])
        #         # print(item_text)
        #         soup = BeautifulSoup(await r.text(), "html.parser")
        #         set_img = soup.select("#infobox > div > table > tbody > tr:nth-child(2) > td > h4 > img")
        #         if not set_img:
        #             set_img = soup.select(
        #                 "#infobox > div.table-responsive > table > tbody > tr:nth-child(2) > td > img")
        #         elif not set_img:
        #             set_img = soup.select(
        #                 "wiki-content-block > div.row > div > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > h4 > img")
        #         # print(set_img)
        #         try:
        #             set_img = fx_url + set_img[0]["src"]
        #         except IndexError:
        #             print("img not found")
        #             set_img = ""
        #         print(set_img)

        #         # save armour set image to assets folder
        #         self.download_image(set_img, item_text)
        #         tables = soup.select("tbody")
        #         # print(len(tables))

        #         find_pieces = []
        #         if len(tables) > 1:
        #             table = tables[1]
        #             rows = table.find_all("tr")
        #             for row in rows:
        #                 first_td = row.find("td")
        #                 if first_td is not None:
        #                     find_pieces.append(first_td)
        #         else:
        #             print("Table not found or index out of range.")
        #         pieces = []
        #         piece_types = {0:"Head", 1:"Chest", 2:"Arms" ,3:"Waist" ,4:"Legs"}
        #         for index,p in enumerate(find_pieces):
        #             piece_type = piece_types[index]
        #             if p.find("img") is not None:
        #                 piece_img = fx_url + p.find("img")["src"]
        #             else:
        #                 piece_img = ""
        #             pieces.append({p.text.strip(): [piece_img, piece_type]})
        #         return {'id': idx, 'item': item_text, 'img': set_img, 'pieces': pieces}

        # async def get_all_items(self):

        #     url = f"{fx_url}/Armor+Sets"

        #     async with aiohttp.ClientSession() as session:
        #         async with session.get(url, headers=headers) as r:
        #             soup = BeautifulSoup(await r.text(), "html.parser")
        #             div_elements = soup.select("div.col-xs-4") + soup.select("div.col-sm-4")
        #             find_all_armour_sets = [element.find("a", attrs={"class": "wiki_link"}) for element in div_elements
        #                                     if element.find("a", attrs={"class": "wiki_link"}) is not None]
        #             tasks = []
        #             for idx, item in enumerate(find_all_armour_sets, start=1):
        #                 task = asyncio.create_task(self.process_armour_sets(session, idx, item))
        #                 tasks.append(task)

        #             all_armour_sets = await asyncio.gather(*tasks)
        #             print(all_armour_sets)
        #             mycursor = mydb.cursor(buffered=True)

        #             for armour in all_armour_sets:
        #                 set_id = armour["id"]
        #                 set_name = armour["item"]
        #                 set_img = armour["img"]
        #                 armour_pieces = json.dumps(armour["pieces"])

        #                 mycursor.execute("SELECT COUNT(*) FROM armour_sets WHERE set_id = %s",
        #                                  [set_id])
        #                 exists = mycursor.fetchall()[0][0]
        #                 print(exists)
        #                 if exists == 0:
        #                     sql = "INSERT INTO armour_sets (set_id, set_name, set_img, armour_pieces) VALUES (%s, %s, %s, %s)"

        #                     mycursor.execute(sql, (set_id, set_name, set_img, armour_pieces))
        #             mydb.commit()
        #             return all_armour_sets


        def get_all_items(self):
            consumables = self.get_consumables()
            materials = self.get_materials()
            scraps = self.get_scraps()
            ammos = self.get_ammo()
            account_items = self.get_account_items()
            room_items = self.get_room_items()
            items = consumables + materials + scraps + ammos + room_items + account_items
            print(items)

            mycursor = mydb.cursor()
            for item in items:
                mycursor.execute("SELECT COUNT(*) FROM items WHERE item_id = %s", [item[0]])
                exists = mycursor.fetchall()[0][0]
                print(exists)
                if exists == 0:
                    sql = "INSERT INTO items (item_id, item_name,item_url,item_img,item_description, item_type) VALUES (%s, %s, %s, %s, %s, %s)"
                    mycursor.execute(sql, item)
                else:
                    sql = "UPDATE items SET item_name = %s, item_url = %s, item_img = %s, item_description = %s WHERE item_id = %s"
                    mycursor.execute(sql, [item[1], item[2], item[3], item[4], item[0]])
            mydb.commit()
            # self.get_crafting_list()
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

                # save item image
                self.download_image(item_img, item_name)

                item_url = consumable.find('a')['href']
                item_id = item_url.split("items/")[1]
                session = requests.Session()
                r = session.get(item_url, headers=headers)
                item_page = BeautifulSoup(r.content, "html.parser")
                item_description = item_page.find("header", attrs={"mb-9 space-y-1"}).find_all("p")[-1].text
                print(item_name)
                print(item_description)
                print(item_id)
                consumables.append((item_id, item_name, item_url, item_img, item_description, "Consumables"))
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
                # save item image
                self.download_image(item_img, item_name)
                item_url = material.find('a')['href']
                item_id = item_url.split("items/")[1]
                session = requests.Session()
                r = session.get(item_url, headers=headers)
                item_page = BeautifulSoup(r.content, "html.parser")
                item_description = item_page.find("header", attrs={"mb-9 space-y-1"}).find_all("p")[-1].text
                print(item_name)
                print(item_description)
                print(item_id)
                materials.append((item_id, item_name, item_url, item_img, item_description, "Materials"))
            return materials

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
                # save item image
                self.download_image(item_img, item_name)
                item_url = scrap.find('a')['href']
                item_id = item_url.split("items/")[1]
                session = requests.Session()
                r = session.get(item_url, headers=headers)
                item_page = BeautifulSoup(r.content, "html.parser")
                item_description = item_page.find("header", attrs={"mb-9 space-y-1"}).find_all("p")[-1].text
                print(item_name)
                print(item_description)
                print(item_id)
                scraps.append((item_id, item_name, item_url, item_img, item_description, "Scraps"))
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
                # save item image
                self.download_image(item_img, item_name)
                item_url = ammo.find('a')['href']
                item_id = item_url.split("items/")[1]
                session = requests.Session()
                r = session.get(item_url, headers=headers)
                item_page = BeautifulSoup(r.content, "html.parser")
                item_description = item_page.find("header", attrs={"mb-9 space-y-1"}).find_all("p")[-1].text
                print(item_name)
                print(item_description)
                print(item_id)
                ammos.append((item_id, item_name, item_url, item_img, item_description, "Ammo"))
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
                # save item image
                self.download_image(item_img, item_name)
                item_url = item.find('a')['href']
                item_id = item_url.split("items/")[1]
                session = requests.Session()
                r = session.get(item_url, headers=headers)
                item_page = BeautifulSoup(r.content, "html.parser")
                item_description = item_page.find("header", attrs={"mb-9 space-y-1"}).find_all("p")[-1].text
                print(item_name)
                print(item_description)
                print(item_id)
                account_items.append((item_id, item_name, item_url, item_img, item_description, "Account Items"))
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
                # save item image
                self.download_image(item_img, item_name)
                item_url = item.find('a')['href']
                item_id = item_url.split("items/")[1]
                session = requests.Session()
                r = session.get(item_url, headers=headers)
                item_page = BeautifulSoup(r.content, "html.parser")
                item_description = item_page.find("header", attrs={"mb-9 space-y-1"}).find_all("p")[-1].text
                print(item_name)
                print(item_description)
                print(item_id)
                room_items.append((item_id, item_name, item_url, item_img, item_description, "Room Items"))
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
        def download_image(self, image_url, name):
            save_path = f"monster-hunter-db\\src\\assets\\armour images\\{name}.png"
            try:

                # Check if the file already exists
                if os.path.exists(save_path):
                    print(f"Image already exists at {save_path}")
                    return
                
                # Send an HTTP GET request to the URL
                response = requests.get(image_url)
                
                # Check if the request was successful (status code 200)
                if response.status_code == 200:
                    # Open the file for binary write
                    with open(save_path, 'wb') as file:
                        # Write the content of the response to the file
                        file.write(response.content)
                    print(f"Image downloaded and saved as {save_path}")
                else:
                    print(f"Failed to download image. Status code: {response.status_code}")
            except Exception as e:
                print(f"An error occurred: {str(e)}")

        async def process_armour_sets(self, session, idx, item):
            if not item.text:
                item_text = "Base Commander Set"
            else:
                item_text = item.text

            async with session.get(fx_url + item["href"], headers=headers) as r:
                # print(fx_url + item["href"])
                # print(item_text)
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
                    print("img not found")
                    set_img = ""
                print(set_img)

                # save armour set image to assets folder
                self.download_image(set_img, item_text)
                tables = soup.select("tbody")
                # print(len(tables))

                find_pieces = []
                if len(tables) > 1:
                    table = tables[1]
                    rows = table.find_all("tr")
                    for row in rows:
                        first_td = row.find("td")
                        if first_td is not None:
                            find_pieces.append(first_td)
                else:
                    print("Table not found or index out of range.")
                pieces = []
                piece_types = {0:"Head", 1:"Chest", 2:"Arms" ,3:"Waist" ,4:"Legs"}
                for index,p in enumerate(find_pieces):
                    piece_type = piece_types[index]
                    if p.find("img") is not None:
                        piece_img = fx_url + p.find("img")["src"]
                    else:
                        piece_img = ""
                    pieces.append({p.text.strip(): [piece_img, piece_type]})
                return {'id': idx, 'item': item_text.strip(), 'img': set_img, 'pieces': pieces}

        async def get_armour_sets(self):

            url = f"{fx_url}/Armor+Sets"

            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=headers) as r:
                    soup = BeautifulSoup(await r.text(), "html.parser")
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
                    piece_type = None
                    for armour_set in armour_sets:
                        # print(type(armour_set["pieces"]))
                        for piece in armour_set["pieces"]:
                            # print(piece)
                            # print(type(piece))
                            if armour_name in piece:
                                # print(armour_set["item"])
                                set_name = armour_set["item"]
                                set_id = armour_set["id"]
                                piece_type = piece[armour_name][1]
                                # matched +=1
                                # print("Matched:"+str(matched))
                                break
                    # print(armour_id, armour_name, set_id, set_name)
                    armours.append(
                        (armour_id, armour_name, armour_url, m_armour_img_url, f_armour_img_url, deco_slots,
                         defense, fire_res, water_res, ice_res, thunder_res, dragon_res, armour_skills,
                         armour_description, forging_materials, rarity, set_id, set_name, piece_type))

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
            batch_size = 100  # Adjust the batch size according to your needs
            batch_values = []

            for armour in armours:
                mycursor.execute("SELECT COUNT(*) FROM armour WHERE armour_id = %s", [armour[0]])
                exists = mycursor.fetchall()[0][0]
                print(exists)
                if exists == 0:
                    batch_values.append(armour)

                    # If the batch_values list reaches the batch_size, execute the batch insert
                    if len(batch_values) >= batch_size:
                        sql = "INSERT INTO armour (armour_id, armour_name, armour_url, m_armour_img_url, f_armour_img_url, deco_slots, defense," \
                              " fire_res, water_res, ice_res, thunder_res, dragon_res, armour_skills, armour_description, forging_materials, rarity, set_id, set_name, piece_type) VALUES " \
                              "(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"

                        mycursor.executemany(sql, batch_values)
                        batch_values = []

            # Insert any remaining values in the batch_values list
            if batch_values:
                sql = "INSERT INTO armour (armour_id, armour_name, armour_url, m_armour_img_url, f_armour_img_url, deco_slots, defense," \
                      " fire_res, water_res, ice_res, thunder_res, dragon_res, armour_skills, armour_description, forging_materials, rarity, set_id, set_name,piece_type) VALUES " \
                      "(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"

                mycursor.executemany(sql, batch_values)

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

    class Quests:

        async def get_all_quests(self):
            sql = "SELECT monster_id, name FROM monsters"
            mycursor = mydb.cursor()
            mycursor.execute(sql)
            monsters = {}
            for id, name in mycursor.fetchall():
                monsters.setdefault(name, id)
            # print(monsters)
            kiranico_quests = await self.get_all_quests_from_kiranico()
            # # fextralife_quests = self.get_all_quests_from_fx()
            game8_quests = await self.get_all_quests_from_game8()
            print(len(kiranico_quests))
            # print([i.get("Quest_Name")for i in kiranico_quests])
            print(len(game8_quests))
            count = 0
            nomatches = []
            matches = []
            matched_quest_names = set()

            for game8 in game8_quests:
                
                translator = str.maketrans('', '', string.punctuation)
    

                # print(kiranico[0])
                game8_Quest_Name = game8.get("Quest_Name")
                clean_game8_Quest_Name = game8_Quest_Name.lower().translate(translator)
                match_found = False  # Flag to track if a match is found for this kiranico quest
                for kiranico in kiranico_quests:
                    kiranico_Quest_Name = kiranico.get("Quest_Name")
                    clean_kiranico_Quest_Name = kiranico_Quest_Name.lower().translate(translator)
                    
                    if clean_kiranico_Quest_Name in matched_quest_names:
                        continue
                    # print(kiranico_Quest_Name)
                    # print(f"{kiranico_Quest_Name.lower()}:{game8_Quest_Name.lower()}")
                    if clean_kiranico_Quest_Name in clean_game8_Quest_Name:
                        print(f"{kiranico_Quest_Name.lower().translate(translator)}:{game8_Quest_Name.lower().translate(translator)}")
                        count += 1
                        # print(kiranico_Quest_Name.lower().translate(translator))
                        game8.update(kiranico)  # Update the kiranico object in place with data from game
                        # matches.append(kiranico)
                        matches.append(game8)
                        matched_quest_names.add(clean_kiranico_Quest_Name)
                        match_found = True
                        break  # No need to continue searching if a match is found
                        
                if not match_found:
                    # print(f"No Match Found for {kiranico_Quest_Name}")
                    nomatches.append({game8_Quest_Name: game8.get("Quest_Type")})
                    # nomatches.add({kiranico_Quest_Name: kiranico.get("Quest_Type")})

            print(len(matches))
            # print(matches)
            print("------------------")
            
            mycursor = mydb.cursor()
            for quest in matches:
                    # print(quest.get("Quest_ID"))
                    # print(quest.get("Quest_Name"))
                    # print("-------------------")
                    mycursor = mydb.cursor()
                    mycursor.execute("SELECT COUNT(*) from quests2 WHERE Quest_ID = %s", [quest.get("Quest_ID")])
                    exists = mycursor.fetchall()
                    if exists[0][0] == 0:
                        sql = "INSERT INTO quests2 (quest_id, quest_name, objective, HRP, MRP, failure_conditions, mini_crown, king_crown, rewards, quest_lvl, quest_type, quest_type_id, quest_location) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
                        val = ([quest.get("Quest_ID"), quest.get("Quest_Name"), quest.get("Objective"), quest.get("HRP"), quest.get("MRP"),
                                quest.get("failure_conditions"), quest.get("mini_crowns"), quest.get("king_crowns"), quest.get("rewards"),
                                quest.get("Quest_Level"), quest.get("Quest_Type"), quest.get("Quest_Type_ID"),quest.get("Quest_Location")])
                        # print(val)
                        # mycursor = mydb.cursor(buffered=True)
                        mycursor.execute(sql, val)
                        if json.loads(quest.get("Monsters")) != []:
                            for monster in json.loads(quest.get("Monsters")):
                                if monster in monsters:
                                    # print(f"{monster}: {monsters.get(monster)}")
                                    mycursor.execute("SELECT COUNT(*) from quest_monsters2 WHERE Quest_ID = %s and monster_id = %s",
                                    [quest.get("Quest_ID"), monsters.get(monster)])
                                    exists = mycursor.fetchall()
                                    if exists[0][0] == 0:
                                        sql = "INSERT INTO quest_monsters2 (Quest_ID, monster_id) VALUES (%s,%s)"
                                        val = ([quest.get("Quest_ID"), monsters.get(monster)])
                                        # mycursor = mydb.cursor()
                                        mycursor.execute(sql, val)
                        # print("------------------------")
            mydb.commit()
            print(len(nomatches))
            print(nomatches)
            with open("mydata.json", "w") as final:
                json.dump(matches, final)
            # print("*------------------*")
            # print([i.get("Quest_Name") for i in game8_quests])


        async def get_all_quests_from_kiranico(self):
            Quest_Type = {0: {"Quest_Type": "Event Quest"}, 1: {"Quest_Type": "Anomaly Quest"},
                          2: {"Quest_Type": "Follower Quest"}, 3: {"Quest_Type": "Hub Master Rank Quest"},
                          4: {"Quest_Type": "Hub High Rank Quest"}, 5: {"Quest_Type": "Hub Low Rank Quest"},
                          6: {"Quest_Type": "Village Quest"}, 7: {"Quest_Type": "Arena Quest"},
                          8: {"Quest_Type": "Training Quest"}}
            async with aiohttp.ClientSession() as session:
                async with session.get(base_url, headers=headers) as response:
                    content = await response.text()
                    soup = BeautifulSoup(content, "html.parser")
                    quests_section = soup.find_all("div", attrs={"class": "relative overflow-hidden rounded-xl p-6 "
                                                                        "text-center space-y-3"})[2].find_all("div", attrs={"class": "block"})
                    print(len(quests_section))
                    # tasks = []
                    # for index, quest in enumerate(quests_section):
                    #     if index!=7:
                    #         continue
                    #     tasks.append(self.get_quests_from_kiranico(session, quest.find("a")["href"], Quest_Type.get(index).get("Quest_Type")))
                    tasks = [self.get_quests_from_kiranico(session, quest.find("a")["href"], Quest_Type.get(index).get("Quest_Type"), index) for index, quest in enumerate(quests_section)]
                    quests_lists = await asyncio.gather(*tasks)
                    quests = [j for i in quests_lists for j in i]  # Flatten list of quest lists into a single list
                    return quests

        async def get_quests_from_kiranico(self, session, url, Quest_Type, Quest_Type_ID):
            async with session.get(url, headers=headers) as response:
                content = await response.text()
                soup = BeautifulSoup(content, "html.parser")
                find_quests = soup.find("table", attrs={
                    "class": "min-w-full divide-y divide-slate-100 dark:divide-slate-400/10"}).find_all("tr")[::3]
                find_quests = [i.find("a")["href"] for i in find_quests]
                tasks = [self.extract_quest_info_kiranico(session, quest, Quest_Type, Quest_Type_ID) for quest in find_quests]
                quests = await asyncio.gather(*tasks)
                return quests

        async def extract_quest_info_kiranico(self, session, quest_link, Quest_Type, Quest_Type_ID):
            async with session.get(quest_link, headers=headers) as response:
                content = await response.text()
                soup = BeautifulSoup(content, "html.parser")
                Quest_Name = soup.find("h1", attrs={
                    "class": "font-display text-3xl tracking-tight text-slate-900 dark:text-white"}).text.split("★")[1].strip()
                print(Quest_Name)
                # print(quest_link)
                Quest_ID = quest_link.split("quests/")[1]
                Quest_Objective = \
                    soup.find_all("div", attrs={"class": "px-4 py-5 sm:p-6"})[0].text.split("Objective")[1].split("(")[
                        0].strip()
                # print(Quest_Objective)
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

                sizes_table = soup.find_all("div", attrs={"class": "basis-1/5"})
                
                mini_crown_chances = {}
                king_crown_chances = {}

                for monster in sizes_table:
                    monster_id = monster.find("a")["href"].split("monsters/")[1]
                    mini_crowns = monster.select(f'tr:has(img[src*="crown_mini"])')
                    mini_crown_chances[monster_id] = []  # Initialize an empty list for each monster_id
                    for mini_crown in mini_crowns:
                        size = mini_crown.text.strip().split(" ")[0].replace("\n", "")
                        chance = mini_crown.text.strip().split(" ")[-1].replace("\n", "")
                        mini_crown_chances[monster_id].append({size: chance})

                    king_crowns = monster.select(f'tr:has(img[src*="crown_king"])')
                    king_crown_chances[monster_id] = []  # Initialize an empty list for each monster_id
                    for king_crown in king_crowns:
                        size = king_crown.text.strip().split(" ")[0].replace("\n", "")
                        chance = king_crown.text.strip().split(" ")[-1].replace("\n", "")
                        king_crown_chances[monster_id].append({size: chance})

                # Convert both dictionaries to JSON format
                mini_crown_chances = json.dumps(mini_crown_chances)
                king_crown_chances = json.dumps(king_crown_chances)

                # print(mini_crown_chances_json)
                # print(king_crown_chances_json)

                quest_rewards_table = soup.find(lambda tag: tag.name == "div" and "basis-1/2" in tag.get("class", [])).find(
                    "table")
                # print(quest_rewards_table)

                rewards_rows = quest_rewards_table.find_all("tr")
                rewards = []
                for reward_row in rewards_rows:
                    # print(reward_row)
                    item_name = reward_row.find("a").text
                    # print(item_name)
                    item_id = reward_row.find("a")["href"].split("items/")[1]
                    # print(item_id)
                    quantity = reward_row.find_all("td")[2].text
                    # print(quantity)
                    reward_chance = reward_row.find_all("td")[3].text
                    # print(reward_chance)
                    rewards.append(
                        {"Item": item_name, "Item id": item_id, "Quantity": quantity, "Chance": reward_chance})

                rewards = json.dumps(rewards)
                # print(rewards)
                quest_details = {"Quest_Name": Quest_Name, "Quest_Url": quest_link, "Quest_ID": Quest_ID,
                                "Objective": Quest_Objective,
                                "HRP": hunter_rank_points, "MRP": master_rank_points,
                                "failure_conditions": failure_conditions, "mini_crowns": mini_crown_chances,
                                "king_crowns": king_crown_chances, "rewards": rewards, "Quest_Type": Quest_Type, "Quest_Type_ID": Quest_Type_ID}
                # print(quest_details)
                return quest_details

        

        # def get_all_quests_from_game8(self):
        #     url = game8_url + "/games/Monster-Hunter-Rise/archives/318295"
        #     session = requests.Session()
        #     r = session.get(url, headers=headers)
        #     soup = BeautifulSoup(r.content, "html.parser")
        #     all_quests = soup.find_all("table", attrs={"class": "a-table"})[0].find_all("td")
        #     print(len(all_quests))
        #     quests = []
        #     for index,questtype in enumerate(all_quests):
        
        #         if index in (1,4,5,7,8):
        #             continue
        #         # if index in (0,1,2,3,4,5,6,7,8,10):
        #         #     continue
        #         try:
        #             Quest_Type = questtype.find("b").text
        #         except AttributeError:
        #             Quest_Type = questtype.find("a").text
        #         print(Quest_Type)
                
        #         if Quest_Type != "Event Quests":
        #             for link in questtype.find_all("a"):
        #                 url = game8_url + link["href"]
        #                 print(url)
        #                 session = requests.Session()
        #                 r = session.get(url, headers=headers)
        #                 soup = BeautifulSoup(r.content, "html.parser")
        #                 quests.append(self.get_quest_info_game8(soup, Quest_Type))
        #         else:
        #             url = game8_url + questtype.find("a")["href"]
        #             print(url)
        #             session = requests.Session()
        #             r = session.get(url, headers=headers)
        #             soup = BeautifulSoup(r.content, "html.parser")
        #             quests.append(self.get_quest_info_game8(soup, Quest_Type))
                
        #     quests = [j for i in quests for j in i] #flatten list of quest lists into a single list
        #     return quests
                
        async def get_all_quests_from_game8(self):
            url = game8_url + "/games/Monster-Hunter-Rise/archives/318295"
            
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=headers) as response:
                    content = await response.text()
                    soup = BeautifulSoup(content, "html.parser")
                    all_quests = soup.find_all("table", attrs={"class": "a-table"})[0].find_all("td")
                    
                    print(len(all_quests))
                    quests = []
                    tasks = []
                    
                    for index, questtype in enumerate(all_quests):
                        if index in (1, 4, 5, 7, 8):
                            continue
                        # if index !=3:
                        #     continue
                        try:
                            Quest_Type = questtype.find("b").text
                        except AttributeError:
                            Quest_Type = questtype.find("a").text
                        print(Quest_Type)
                        
                        if Quest_Type != "Event Quests":
                            for link in questtype.find_all("a"):
                                quest_url = game8_url + link["href"]
                                print(quest_url)
                                tasks.append(self.get_quest_info_game8(session, quest_url, Quest_Type))
                        else:
                            event_quest_url = game8_url + questtype.find("a")["href"]
                            tasks.append(self.get_quest_info_game8(session, event_quest_url, Quest_Type))
                    
                    quests_lists = await asyncio.gather(*tasks)
                    quests = [j for i in quests_lists for j in i]  # Flatten list of quest lists into a single list
                    return quests
        # def get_quest_info_game8(self, soup, Quest_Type):

        #     quests = []

        #     if Quest_Type == "Gathering Hub Quests":
        #         gathering_hub_quests = self.extract_gathering_hub_quests_info(soup, Quest_Type)
        #         quests.append(gathering_hub_quests)
                      
        #     elif Quest_Type == "Arena Quests":
        #         arena_quests = self.extract_arena_quests_info(soup, Quest_Type)
        #         quests.append(arena_quests)
            
        #     elif Quest_Type == "Event Quests":
        #         event_quests = self.extract_event_quests_info(soup, Quest_Type)
        #         quests.append(event_quests)

        #     elif Quest_Type == "Challenge Quests":
        #         challenge_quests = self.extract_challenge_quests_info(soup, Quest_Type)
        #         quests.append(challenge_quests)
            
        #     elif Quest_Type == "Follower Quests":
        #         follower_quests = self.extract_follower_quests_info(soup, Quest_Type)
        #         quests.append(follower_quests)
            
        #     elif Quest_Type == "Support Surveys":
        #         support_survey_quests = self.extract_support_survey_quests_info(soup, Quest_Type)
        #         quests.append(support_survey_quests)

        #     elif Quest_Type == "Anomaly Quests":
        #         anomaly_quests = self.extract_anomaly_quests_info(soup, Quest_Type)
        #         quests.append(anomaly_quests)

        #     else:
        #         quests.append(self.extract_quests_info(soup, Quest_Type))
        #     return quests
        

        async def get_quest_info_game8(self, session, url, Quest_Type):
            quests = []
            
            async with session.get(url, headers=headers) as response:
                content = await response.text()
                soup = BeautifulSoup(content, "html.parser")
                
                if Quest_Type == "Gathering Hub Quests":
                    gathering_hub_quests = await self.extract_gathering_hub_quests_info(soup, Quest_Type)
                    # gathering_hub_quests = [j for i in gathering_hub_quests for j in i]
                    quests.append(gathering_hub_quests)

                elif Quest_Type == "Arena Quests":
                    arena_quests = await self.extract_arena_quests_info(soup, Quest_Type)
                    # arena_quests = [j for i in arena_quests for j in i]
                    quests.append(arena_quests)

                elif Quest_Type == "Event Quests":
                    event_quests = await self.extract_event_quests_info(soup, Quest_Type)
                    # event_quests = [j for i in event_quests for j in i]
                    quests.append(event_quests)

                elif Quest_Type == "Challenge Quests":
                    challenge_quests = await self.extract_challenge_quests_info(soup, Quest_Type)
                    # challenge_quests = [j for i in challenge_quests for j in i]
                    quests.append(challenge_quests)

                elif Quest_Type == "Follower Quests":
                    follower_quests = await self.extract_follower_quests_info(soup, Quest_Type)
                    # follower_quests = [j for i in follower_quests for j in i]
                    quests.append(follower_quests)

                elif Quest_Type == "Support Surveys":
                    support_survey_quests = await self.extract_support_survey_quests_info(soup, Quest_Type)
                    # support_survey_quests = [j for i in support_survey_quests for j in i]
                    quests.append(support_survey_quests)

                elif Quest_Type == "Anomaly Quests":
                    anomaly_quests = await self.extract_anomaly_quests_info(soup, Quest_Type)
                    # anomaly_quests = [j for i in anomaly_quests for j in i]
                    quests.append(anomaly_quests)

                else:
                    other_quests = await self.extract_quests_info(soup, Quest_Type)
                    # other_quests = [j for i in other_quests for j in i]
                    quests.append(other_quests)
                
                quests = [j for i in quests for j in i]  # Flatten list of quest lists into a single list
                return quests
                

        async def extract_gathering_hub_quests_info(self, soup, Quest_Type):
            quests = []
            quest_tables = soup.find_all("table", attrs={"class": "a-table"})[1:-1]

            for table in quest_tables:
                quest_rows = table.find_all("tr")[1:][::2]
                for row in quest_rows:
                    Quest_Name = row.find_all("td")[0].find("a").text
                    print(Quest_Name)
                    monsters = [i.text.strip() for i in row.find_all("td")[1].find_all("a")]
                    monsters = json.dumps(monsters)
                    quest_link = row.find_all("td")[0].find("a")["href"]
                    
                    async with aiohttp.ClientSession() as session:
                        async with session.get(quest_link, headers=headers) as response:
                            quest_html = await response.text()
                            soup = BeautifulSoup(quest_html, "html.parser")
                            quest_table_rows = soup.find("table", attrs={"class": "a-table a-table a-table"}).find_all("tr")
                            quest_lvl = quest_table_rows[0].find_all("td")[0].text
                            quest_locale = quest_table_rows[0].find_all("td")[1].text.strip()
                            quests.append({"Quest_Name": Quest_Name, "Quest_Level": quest_lvl,"Quest_Type": Quest_Type, 
                                            "Monsters": monsters, "Quest_Location": quest_locale})

            return quests

        async def extract_arena_quests_info(self, soup, Quest_Type):
            quests = []
            arena_Quest_Names = []
            for index, i in enumerate(soup.find_all("h3", attrs={"class": "a-header--3"})[:12]):
                if index <= 5:
                    arena_Quest_Names.append(f"MR {i.text}")
                else:
                    arena_Quest_Names.append(i.text)
            # arena_Quest_Names = [i.text "MR"+i.text for index,i in enumerate(soup.find_all("h3", attrs={"class": "a-header--3"})[:12]) if index <= 5]
            
            arena_quest_tables = soup.find_all("table", attrs={"class": "a-table a-table a-table"})[:12]

            for index, table in enumerate(arena_quest_tables):
                Quest_Name = arena_Quest_Names[index]
                quest_rows = table.find_all("tr")
                quest_locale = quest_rows[0].find_all("td")[0].text.strip()
                monsters = [i.text.strip() for i in quest_rows[0].find_all("td")[1].find_all("a")]
                monsters = json.dumps(monsters)
                weapons = [i["alt"] for i in quest_rows[1].find_all("td")[0].find_all("img")]
                weapons = json.dumps(weapons)
                quests.append({"Quest_Name": Quest_Name, "Quest_Type": Quest_Type, 
                            "Monsters": monsters, "Quest_Location": quest_locale, "Weapons": weapons})

            quests.reverse() #reverse arena quests list to allow for proper matching later
            return quests

        async def extract_event_quests_info(self, soup, Quest_Type):
            quests = []
            event_quest_tables = soup.find_all("table", attrs={"class": "a-table a-table a-table"})[:-1]

            for table in event_quest_tables:
                event_quest_rows = table.find_all("tr")
                for row in event_quest_rows:
                    for quest in row.find_all("td"):
                        Quest_Name = quest.find("a").text
                        print(Quest_Name)
                        # special_reward = row.find_all("td")[1].text.strip()
                        quest_link = quest.find("a")["href"]

                        async with aiohttp.ClientSession() as session:
                            async with session.get(quest_link, headers=headers) as response:
                                quest_html = await response.text()
                                soup = BeautifulSoup(quest_html, "html.parser")
                                monsters_table_rows = soup.find("table", attrs={"class": "a-table a-table"}).find_all("tr")
                                monsters = [i.find("a").text for i in monsters_table_rows[1:] if monsters_table_rows[0].find("th").text == "Monster"]
                                monsters = json.dumps(monsters)
                                quest_table_rows = soup.find("table", attrs={"class": "a-table a-table a-table"}).find_all("tr")
                                quest_lvl = quest_table_rows[0].find_all("td")[0].text
                                quest_locale = quest_table_rows[0].find_all("td")[1].text.strip()
                                quests.append({"Quest_Name": Quest_Name, "Quest_Level": quest_lvl,"Quest_Type": Quest_Type, 
                                                "Monsters": monsters, "Quest_Location": quest_locale})

            return quests

        async def extract_challenge_quests_info(self, soup, Quest_Type):
            quests = []
            challenge_Quest_Names = [i.text for i in soup.find_all("h3", attrs={"class": "a-header--3"})[:12]]
            challenge_quest_tables = soup.find_all("table", attrs={"class": "a-table a-table a-table"})[:7]

            for index, table in enumerate(challenge_quest_tables):
                Quest_Name = challenge_Quest_Names[index]
                quest_rows = table.find_all("tr")
                quest_locale = quest_rows[0].find_all("td")[0].text.strip()
                monsters = [i.text for i in quest_rows[0].find_all("td")[1].find_all("a")]
                monsters = json.dumps(monsters)
                weapons = [i["alt"] for i in quest_rows[1].find_all("td")[0].find_all("img")]
                weapons = json.dumps(weapons)
                quests.append({"Quest_Name": Quest_Name, "Quest_Type": Quest_Type, 
                            "Monsters": monsters, "Quest_Location": quest_locale, "Weapons": weapons})

            return quests

        async def extract_follower_quests_info(self, soup, Quest_Type):
            quests = []
            follower_quest_tables = soup.find_all("table", attrs={"class": "a-table a-table"})

            followers = [i.text.split("'")[0] for i in soup.find_all("h3", attrs={"class": "a-header--3"})[1:11]]

            for index, table in enumerate(follower_quest_tables):
                quest_rows = table.find_all("tr")[1:]
                follower = followers[index]

                for row in quest_rows:
                    Quest_Name = row.find_all("td")[1].find("a").text
                    print(Quest_Name)
                    quest_link = row.find_all("td")[1].find("a")["href"]

                    async with aiohttp.ClientSession() as session:
                        async with session.get(game8_url + quest_link, headers=headers) as response:
                            quest_html = await response.text()
                            soup = BeautifulSoup(quest_html, "html.parser")
                            monsters_table_rows = soup.find("table", attrs={"class": "a-table a-table"}).find_all("tr")
                            monsters = [i.find("a").text for i in monsters_table_rows[1:]]
                            monsters = json.dumps(monsters)
                            quest_table_rows = soup.find("table", attrs={"class": "a-table a-table a-table"}).find_all("tr")
                            quest_lvl = quest_table_rows[0].find_all("td")[0].text
                            quest_locale = quest_table_rows[0].find_all("td")[1].text.strip()
                            quests.append({"Quest_Name": Quest_Name, "Quest_Level": quest_lvl, "Quest_Type": Quest_Type, 
                                            "Monsters": monsters, "Quest_Location": quest_locale, "Follower": follower})

            return quests

        async def extract_support_survey_quests_info(self, soup, Quest_Type):
            quests = []
            quest_tables = soup.find_all("table", attrs={"class": "a-table"})[2:7]

            for table in quest_tables:
                quest_rows = table.find_all("tr")[1:][::2]
                for row in quest_rows:
                    Quest_Name = row.find_all("td")[0].find("a").text
                    print(Quest_Name)

                    monsters = [i.text.strip() for i in row.find_all("td")[1].find_all("a")]
                    monsters = json.dumps(monsters)
                    quest_link = row.find_all("td")[0].find("a")["href"]
                    
                    async with aiohttp.ClientSession() as session:
                        async with session.get(quest_link, headers=headers) as response:
                            quest_html = await response.text()
                            soup = BeautifulSoup(quest_html, "html.parser")
                            quest_table_rows = soup.find("table", attrs={"class": "a-table a-table a-table"}).find_all("tr")
                            quest_lvl = quest_table_rows[0].find_all("td")[0].text
                            quest_locale = quest_table_rows[0].find_all("td")[1].text.strip()
                            quests.append({"Quest_Name": Quest_Name, "Quest_Level": quest_lvl, "Quest_Type": Quest_Type, 
                                            "Monsters": monsters, "Quest_Location": quest_locale})

            return quests

        async def extract_anomaly_quests_info(self, soup, Quest_Type):
            quests = []
            quest_tables = soup.find_all("table", attrs={"class": "a-table a-table a-table"})

            for table in quest_tables:
                quest_rows = table.find_all("tr")[1:][::2]
                for row in quest_rows:
                    try:
                        Quest_Name = row.find_all("td")[0].find("a").text
                    except AttributeError:
                        Quest_Name = row.find_all("td")[0].find("b").text

                    print(Quest_Name)

                    monsters = [i.text.strip() for i in row.find_all("td")[1].find_all("a")]
                    monsters = json.dumps(monsters)
                    
                    
                    try:
                        quest_link = row.find_all("td")[0].find("a")["href"]

                        async with aiohttp.ClientSession() as session:
                            async with session.get(quest_link, headers=headers) as response:
                                quest_html = await response.text()
                                soup = BeautifulSoup(quest_html, "html.parser")
                                quest_table_rows = soup.find("table", attrs={"class": "a-table a-table a-table"}).find_all("tr")
                                quest_lvl = quest_table_rows[0].find_all("td")[0].text
                                quest_locale = quest_table_rows[0].find_all("td")[1].text.strip()
                    except Exception as e:
                        print(f"Error fetching quest details: {e}")
                        # quest_link = row.find_all("td")[0].find("a")["href"]
                        quest_lvl = ""
                        quest_locale = ""
                        # Handle the exception here if needed
                        
                    quests.append({"Quest_Name": Quest_Name, "Quest_Level": quest_lvl, "Quest_Type": Quest_Type, 
                                    "Monsters": monsters, "Quest_Location": quest_locale})

            return quests

        async def extract_quests_info(self, soup, Quest_Type):
            quests = []
            quest_tables = soup.find_all("table", attrs={"class": "a-table"})[:-1]
            # print(quest_tables)
            for table in quest_tables:
                quest_rows = table.find_all("tr")[1:][::2]
                for row in quest_rows:
                    Quest_Name = row.find_all("td")[0].find("a").text
                    print(Quest_Name)
                    monsters = [i.text.strip() for i in row.find_all("td")[1].find_all("a")]
                    monsters = json.dumps(monsters)
                    quest_link = row.find_all("td")[0].find("a")["href"]
                    
                    async with aiohttp.ClientSession() as session:
                        async with session.get(quest_link, headers=headers) as response:
                            quest_html = await response.text()
                            soup = BeautifulSoup(quest_html, "html.parser")
                            quest_table_rows = soup.find("table", attrs={"class": "a-table a-table a-table"}).find_all("tr")
                            quest_lvl = quest_table_rows[0].find_all("td")[0].text
                            quest_locale = quest_table_rows[0].find_all("td")[1].text.strip()
                            quests.append({"Quest_Name": Quest_Name, "Quest_Level": quest_lvl, "Quest_Type": Quest_Type, 
                                            "Monsters": monsters, "Quest_Location": quest_locale})

            return quests

        # def extract_gathering_hub_quests_info(self, soup, Quest_Type):
        #     # needed to change quest tables for hub quests
        #     quests = []
        #     quest_tables = soup.find_all("table", attrs={"class": "a-table"})[1:-1]
        #     # print(len(quest_tables))
        #     for table in quest_tables:
        #         quest_rows = table.find_all("tr")[1:][::2]
        #         for row in quest_rows:
        #             # print(row)
        #             Quest_Name = row.find_all("td")[0].find("a").text
        #             print("------------")
        #             print(Quest_Name)
        #             monsters = [i.text.strip() for i in row.find_all("td")[1].find_all("a")]
        #             monsters = json.dumps(monsters)
        #             print(monsters)
        #             quest_link = row.find_all("td")[0].find("a")["href"]
        #             print(quest_link)
        #             session = requests.Session()
        #             r = session.get(quest_link, headers=headers)
        #             soup = BeautifulSoup(r.content, "html.parser")
        #             quest_table_rows = soup.find("table", attrs={"class": "a-table a-table a-table"}).find_all("tr")
        #             # print(quest_table_rows)
        #             quest_lvl = quest_table_rows[0].find_all("td")[0].text
        #             print(quest_lvl)
        #             quest_locale = quest_table_rows[0].find_all("td")[1].text.strip()
        #             print(quest_locale)
        #             quests.append({"Quest_Name": Quest_Name, "Quest_Level": quest_lvl,"Quest_Type": Quest_Type, 
        #                             "Monsters": monsters, "Quest_Location": quest_locale})
        #             print("------------")
        #     return quests
        
        # def extract_arena_quests_info(self, soup, Quest_Type):
        #     # needed to change quest tables for hub quests
        #     quests = []
        #     arena_Quest_Names = [i.text for i in soup.find_all("h3", attrs={"class": "a-header--3"})[:12]]
        #     print(arena_Quest_Names)
        #     arena_quest_tables = soup.find_all("table", attrs={"class": "a-table a-table a-table"})
        #     print(len(arena_quest_tables[:12]))
        #     for index,table in enumerate(arena_quest_tables[:12]):
        #         Quest_Name = arena_Quest_Names[index]
        #         quest_rows = table.find_all("tr")
        #         quest_locale = quest_rows[0].find_all("td")[0].text.strip()
        #         monsters = [i.text for i in quest_rows[0].find_all("td")[1].find_all("a")]
        #         monsters = json.dumps(monsters)
        #         weapons = [i["alt"] for i in quest_rows[1].find_all("td")[0].find_all("img")]
        #         weapons = json.dumps(weapons)
        #         print(quest_locale)
        #         print(monsters)
        #         print(weapons)
        #         quests.append({"Quest_Name": Quest_Name,"Quest_Type": Quest_Type, 
        #                             "Monsters": monsters, "Quest_Location": quest_locale, "Weapons": weapons})
        #     return quests
        
        # def extract_event_quests_info(self, soup, Quest_Type):
        #     # needed to change quest tables for hub quests
        #     quests = []
        #     event_quest_tables = soup.find_all("table", attrs={"class": "a-table a-table a-table"})[:-1]
        #     print(len(event_quest_tables))
        #     for table in event_quest_tables:
        #         event_quest_rows = table.find_all("tr")
        #         print(len(event_quest_rows))
        #         for row in event_quest_rows:
        #             # print(len(row))
        #             row_quests = row.find_all("td")
        #             for quest in row_quests:
        #                 Quest_Name = quest.find("a").text
        #                 print("------------")
        #                 print(Quest_Name)
        #                 special_reward = quest.contents[-1].strip()
        #                 print(special_reward)
        #                 quest_link = quest.find("a")["href"]
        #                 session = requests.Session()
        #                 r = session.get(quest_link, headers=headers)
        #                 soup = BeautifulSoup(r.content, "html.parser")
        #                 monsters_table_rows = soup.find("table", attrs={"class": "a-table a-table"}).find_all("tr")
        #                 # print(monsters_table_rows[0].find("th"))
        #                 monsters = [i.find("a").text for i in monsters_table_rows[1:] if monsters_table_rows[0].find("th").text == "Monster"]
        #                 monsters = json.dumps(monsters)
        #                 print(monsters)
        #                 quest_table_rows = soup.find("table", attrs={"class": "a-table a-table a-table"}).find_all("tr")
        #                 # print(quest_table_rows)
        #                 quest_lvl = quest_table_rows[0].find_all("td")[0].text
        #                 print(quest_lvl)
        #                 quest_locale = quest_table_rows[0].find_all("td")[1].text.strip()
        #                 print(quest_locale)
        #                 quests.append({"Quest_Name": Quest_Name, "Quest_Level": quest_lvl,"Quest_Type": Quest_Type, 
        #                             "Monsters": monsters, "Quest_Location": quest_locale})
        
        #             print("------------")
        #     return quests
        
        # def extract_challenge_quests_info(self, soup, Quest_Type):
        #     # needed to change quest tables for hub quests
        #     quests = []
        #     challenge_Quest_Names = [i.text for i in soup.find_all("h3", attrs={"class": "a-header--3"})[:12]]
        #     print(challenge_Quest_Names)
        #     challenge_quest_tables = soup.find_all("table", attrs={"class": "a-table a-table a-table"})
        #     print(len(challenge_quest_tables[:12]))
        #     for index,table in enumerate(challenge_quest_tables[:7]):
        #         Quest_Name = challenge_Quest_Names[index]
        #         quest_rows = table.find_all("tr")
        #         quest_locale = quest_rows[0].find_all("td")[0].text.strip()
        #         monsters = [i.text for i in quest_rows[0].find_all("td")[1].find_all("a")]
        #         monsters = json.dumps(monsters)
        #         weapons = [i["alt"] for i in quest_rows[1].find_all("td")[0].find_all("img")]
        #         weapons = json.dumps(weapons)
        #         print(quest_locale)
        #         print(monsters)
        #         print(weapons)
        #         quests.append({"Quest_Name": Quest_Name,"Quest_Type": Quest_Type, 
        #                             "Monsters": monsters, "Quest_Location": quest_locale, "Weapons": weapons})
        #     return quests
        
        # def extract_follower_quests_info(self, soup, Quest_Type):
        #     # needed to change quest tables for hub quests
        #     quests = []
        #     follower_quest_tables = soup.find_all("table", attrs={"class": "a-table a-table"})
        #     print(len(follower_quest_tables))
        #     followers = [i.text.split("'")[0] for i in soup.find_all("h3", attrs={"class": "a-header--3"})[1:11]]
        #     # print(followers)
        #     for index,table in enumerate(follower_quest_tables):
        #         quest_rows = table.find_all("tr")[1:]
        #         follower = followers[index]
        #         print(follower)
        #         for row in quest_rows:
        #             Quest_Name = row.find_all("td")[1].find("a").text
        #             print(Quest_Name)
        #             quest_link = row.find_all("td")[1].find("a")["href"]
        #             session = requests.Session()
        #             r = session.get(game8_url + quest_link, headers=headers)
        #             soup = BeautifulSoup(r.content, "html.parser")
        #             monsters_table_rows = soup.find("table", attrs={"class": "a-table a-table"}).find_all("tr")
        #             # print(len(monsters_table_rows))
        #             monsters = [i.find("a").text for i in monsters_table_rows[1:]]
        #             monsters = json.dumps(monsters)
        #             print(monsters)
        #             quest_table_rows = soup.find("table", attrs={"class": "a-table a-table a-table"}).find_all("tr")
        #             quest_lvl = quest_table_rows[0].find_all("td")[0].text
        #             print(quest_lvl)
        #             quest_locale = quest_table_rows[0].find_all("td")[1].text
        #             print(quest_locale.strip())
        #             quests.append({"Quest_Name": Quest_Name, "Quest_Level": quest_lvl,"Quest_Type": Quest_Type, 
        #                             "Monsters": monsters, "Quest_Location": quest_locale, "Follower": follower})
        #     return quests
        
        # def extract_support_survey_quests_info(self, soup, Quest_Type):
        #     quests = []
        #     quest_tables = soup.find_all("table", attrs={"class": "a-table"})[2:7]
        #     # print(len(quest_tables))
        #     for table in quest_tables:
        #         quest_rows = table.find_all("tr")[1:][::2]
        #         print("****************")
        #         # print(len(quest_rows))
        #         for row in quest_rows:
        #             # print(row)
        #             Quest_Name = row.find_all("td")[0].find("a").text
        #             print("------------")
        #             print(Quest_Name)
        #             monsters = [i.text.strip() for i in row.find_all("td")[1].find_all("a")]
        #             monsters = json.dumps(monsters)
        #             print(monsters)
        #             quest_link = row.find_all("td")[0].find("a")["href"]
        #             print(quest_link)
        #             session = requests.Session()
        #             r = session.get(quest_link, headers=headers)
        #             soup = BeautifulSoup(r.content, "html.parser")
        #             quest_table_rows = soup.find("table", attrs={"class": "a-table a-table a-table"}).find_all("tr")
        #             quest_lvl = quest_table_rows[0].find_all("td")[0].text
        #             print(quest_lvl)
        #             quest_locale = quest_table_rows[0].find_all("td")[1].text.strip()
        #             print(quest_locale)
        #             quests.append({"Quest_Name": Quest_Name, "Quest_Level": quest_lvl,"Quest_Type": Quest_Type, 
        #                             "Monsters": monsters, "Quest_Location": quest_locale})
        #             print("------------")
        #     return quests
        
        # def extract_anomaly_quests_info(self, soup, Quest_Type):
        #     quests = []
        #     quest_tables = soup.find_all("table", attrs={"class": "a-table a-table a-table"})
        #     # print(len(quest_tables))
        #     for table in quest_tables:
        #         quest_rows = table.find_all("tr")[1:][::2]
        #         for row in quest_rows:
        #             try:
        #                 Quest_Name = row.find_all("td")[0].find("a").text
        #             except AttributeError:
        #                 Quest_Name = row.find_all("td")[0].find("b").text
        #             print("------------")
        #             print(Quest_Name)
        #             monsters = [i.text.strip() for i in row.find_all("td")[1].find_all("a")]
        #             monsters = json.dumps(monsters)
        #             print(monsters)
        #             try:
        #                 quest_link = row.find_all("td")[0].find("a")["href"]
        #                 print(quest_link)
        #                 session = requests.Session()
        #                 r = session.get(quest_link, headers=headers)
        #                 soup = BeautifulSoup(r.content, "html.parser")
        #                 quest_table_rows = soup.find("table", attrs={"class": "a-table a-table a-table"}).find_all("tr")
        #                 quest_lvl = quest_table_rows[0].find_all("td")[0].text
        #                 print(quest_lvl)
        #                 quest_locale = quest_table_rows[0].find_all("td")[1].text.strip()
        #                 print(quest_locale)
        #             except TypeError:
        #                 quest_link = ""
        #                 quest_lvl = ""
        #                 quest_locale = ""
        #             quests.append({"Quest_Name": Quest_Name, "Quest_Level": quest_lvl,"Quest_Type": Quest_Type, 
        #                             "Monsters": monsters, "Quest_Location": quest_locale})
        #             print("------------")
        #     return quests
        
        # def extract_quests_info(self, soup, Quest_Type):
        #     quests = []
        #     quest_tables = soup.find_all("table", attrs={"class": "a-table"})[:-1]
        #     # print(len(quest_tables))
        #     for table in quest_tables:
        #         quest_rows = table.find_all("tr")[1:][::2]
        #         # print(len(quest_rows))
        #         for row in quest_rows:
        #             # print(row)
        #             Quest_Name = row.find_all("td")[0].find("a").text
        #             print("------------")
        #             print(Quest_Name)
        #             monsters = [i.text.strip() for i in row.find_all("td")[1].find_all("a")]
        #             monsters = json.dumps(monsters)
        #             print(monsters)
        #             quest_link = row.find_all("td")[0].find("a")["href"]
        #             print(quest_link)
        #             session = requests.Session()
        #             r = session.get(quest_link, headers=headers)
        #             soup = BeautifulSoup(r.content, "html.parser")
        #             quest_table_rows = soup.find("table", attrs={"class": "a-table a-table a-table"}).find_all("tr")
        #             quest_lvl = quest_table_rows[0].find_all("td")[0].text
        #             print(quest_lvl)
        #             quest_locale = quest_table_rows[0].find_all("td")[1].text.strip()
        #             print(quest_locale)
        #             quests.append({"Quest_Name": Quest_Name, "Quest_Level": quest_lvl,"Quest_Type": Quest_Type, 
        #                             "Monsters": monsters, "Quest_Location": quest_locale})
        #             print("------------")
        #     return quests










webscrape = Scraper(headers, base_url, mydb)
# webscrape.Quests().get_all_quests()
# loop = asyncio.get_event_loop()
# quests = loop.run_until_complete(webscrape.Quests().get_all_quests())
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
